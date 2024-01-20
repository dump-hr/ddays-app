module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name             = "${var.name_prefix}-vpc"
  cidr             = var.vpc_cidr
  azs              = var.azs
  private_subnets  = var.private_subnets
  public_subnets   = var.public_subnets
  database_subnets = var.database_subnets

  # Single NAT Gateway
  enable_nat_gateway     = var.enable_nat_gateway
  single_nat_gateway     = var.enable_nat_gateway
  one_nat_gateway_per_az = false

  tags = merge(
    {
      ManagedBy = "terraform"
    },
    var.tags
  )

  public_subnet_tags = {
    Role = "public"
  }

  private_subnet_tags = {
    Role = "private"
  }

  database_subnet_tags = {
    Role = "database"
  }
}
