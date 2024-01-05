#####################
# bucket

resource "aws_s3_bucket" "website" {
  bucket        = var.bucket_name
  force_destroy = true

  tags = merge(
    {
      ManagedBy = "terraform"
    },
    var.tags
  )
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "website" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.website.json
}

data "aws_iam_policy_document" "website" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.website.iam_arn]
    }
  }
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id
  versioning_configuration {
    status = var.bucket_versioning ? "Enabled" : "Disabled"
  }
}

#####################
# cdn

resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.website.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.website.bucket

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.website.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  comment             = aws_s3_bucket.website.bucket
  price_class         = "PriceClass_200"
  aliases             = [var.website_domain]
  depends_on          = [aws_acm_certificate_validation.website]
  wait_for_deployment = var.wait_for_cdn_deployment

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.website.bucket
    compress         = true

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  dynamic "custom_error_response" {
    for_each = var.single_page_app ? [403, 404] : []

    content {
      error_code         = custom_error_response.value
      response_code      = 200
      response_page_path = "/index.html"
    }
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.website.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = merge(
    {
      ManagedBy = "terraform"
    },
    var.tags
  )
}

resource "aws_cloudfront_origin_access_identity" "website" {
}

#####################
# domain and ssl

resource "cloudflare_record" "website" {
  zone_id         = var.cloudflare_zone_id
  name            = var.website_domain
  value           = aws_cloudfront_distribution.website.domain_name
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
  comment         = "Managed by terraform"
}

resource "aws_acm_certificate" "website" {
  domain_name       = var.website_domain
  validation_method = "DNS"
  provider          = aws.us-east-1

  tags = merge(
    {
      ManagedBy = "terraform"
    },
    var.tags
  )
}

resource "aws_acm_certificate_validation" "website" {
  certificate_arn         = aws_acm_certificate.website.arn
  validation_record_fqdns = [for record in cloudflare_record.website_certificate_validation : record.hostname]
  provider                = aws.us-east-1
}

resource "cloudflare_record" "website_certificate_validation" {
  for_each = {
    for v in aws_acm_certificate.website.domain_validation_options : v.domain_name => {
      name   = v.resource_record_name
      record = v.resource_record_value
      type   = v.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  value           = each.value.record
  ttl             = 60
  type            = each.value.type
  zone_id         = var.cloudflare_zone_id
  comment         = "Managed by terraform"
}
