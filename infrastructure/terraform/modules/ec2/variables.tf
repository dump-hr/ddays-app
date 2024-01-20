variable "name_prefix" {
  description = "Name prefix for EC2 instances."
  type        = string
}

variable "instance_count" {
  type        = number
  description = "number of instances to create"
  default     = 1
}

variable "instance_type" {
  type        = string
  description = "instance type"
  default     = "t3a.micro"
}

variable "instance_root_device_size" {
  type        = number
  description = "Root bock device size in GB"
  default     = 12
}

variable "subnets" {
  type        = list(string)
  description = "valid subnets to assign to server"
}

variable "security_groups" {
  type        = list(string)
  description = "security groups to assign to server"
  default     = []
}

variable "ssh_public_key" {
  type        = string
  description = "EC2 instance ssh public key"
}

variable "create_elastic_ip" {
  type        = bool
  description = "create an EIP for the ec2 instances"
  default     = true
}

variable "website_domain" {
  description = "Domain name for hosted website."
  type        = string
  default     = ""
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone id for website domain."
  type        = string
  default     = ""
}

variable "tags" {
  type        = map(string)
  description = "tags for ec2 instances"
  default     = {}
}
