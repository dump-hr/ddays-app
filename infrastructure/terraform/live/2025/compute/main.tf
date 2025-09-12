terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }

    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }

    sops = {
      source  = "carlpett/sops"
      version = "~> 0.5"
    }
  }

  backend "s3" {
    bucket         = "ddays-app-tfstate"
    dynamodb_table = "ddays-app-tfstate-lock"
    region         = "us-east-1"
    profile        = "ddays-app"
    encrypt        = true
  }
}

provider "aws" {
  region  = "eu-central-1"
  profile = "ddays-app"
}

provider "cloudflare" {
  api_token = data.sops_file.secrets.data["cloudflare_api_token"]
}

data "cloudflare_zone" "dump_hr" {
  name = "dump.hr"
}

data "sops_file" "secrets" {
  source_file = "secrets.enc.json"
}

module "web" {
  source = "../../../modules/ec2"

  name_prefix               = "ddays-app-2025"
  instance_type             = "t3a.nano"
  instance_count            = 1
  instance_root_device_size = 20
  subnets                   = data.aws_subnets.public_subnets.ids
  security_groups           = data.aws_security_groups.public_sg.ids
  ssh_public_key            = file("../../../../ssh-keys/2025.pub")
  website_domain            = "2025-days.dump.hr"
  cloudflare_zone_id        = data.cloudflare_zone.dump_hr.id

  tags = {
    Project     = "ddays-app"
    Role        = "web"
    Environment = "2025"
  }
}
