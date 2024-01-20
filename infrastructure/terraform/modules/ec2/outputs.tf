output "instance_ips" {
  value = aws_eip.eip[*].public_ip
}

output "instance_ids" {
  value = aws_instance.instance[*].id
}

output "website_endpoint" {
  value = (var.website_domain != "" && var.cloudflare_zone_id != "") ? cloudflare_record.website[0].hostname : null
}
