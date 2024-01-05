variable "bucket_name" {
  description = "Name of the S3 bucket. Must be globally unique."
  type        = string
}

variable "bucket_versioning" {
  description = "Enable versioning for the S3 bucket."
  type        = bool
  default     = false
}

variable "website_domain" {
  description = "Domain name for static website."
  type        = string
}

variable "single_page_app" {
  description = "Is website single page app."
  type        = bool
  default     = false
}

variable "wait_for_cdn_deployment" {
  description = "Wait for CDN deployment."
  type        = bool
  default     = true
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone id for website domain."
  type        = string
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "tags for the static website"
}
