variable "name_prefix" {
  description = "Name prefix for security groups."
  type        = string
}

variable "vpc_cidr" {
  type        = string
  description = "The IP range to use for the VPC"
  default     = "10.0.0.0/16"
}

variable "azs" {
  type        = list(string)
  description = "AZs to create subnets into"
}

variable "public_subnets" {
  type        = list(string)
  description = "subnets to create for public network traffic, one per AZ"
}

variable "private_subnets" {
  type        = list(string)
  description = "subnets to create for private network traffic, one per AZ"
  default     = []
}

variable "database_subnets" {
  type        = list(string)
  description = "subnets to create for database traffic, one per AZ"
  default     = []
}

variable "enable_nat_gateway" {
  type        = bool
  description = "Provision NAT Gateway for private networks."
  default     = false
}

variable "tags" {
  type        = map(string)
  description = "tags for the static website"
  default     = {}
}
