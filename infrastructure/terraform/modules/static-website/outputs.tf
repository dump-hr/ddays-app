output "cloudfront_endpoint" {
  value = aws_cloudfront_distribution.website.domain_name
}

output "website_endpoint" {
  value = cloudflare_record.website.hostname
}
