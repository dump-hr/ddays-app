resource "random_shuffle" "subnets" {
  input        = var.subnets
  result_count = var.instance_count
}

resource "aws_key_pair" "ssh" {
  key_name   = "${var.name_prefix}-ssh-key"
  public_key = var.ssh_public_key
}

resource "aws_instance" "instance" {
  ami                    = data.aws_ami.debian.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.ssh.key_name
  vpc_security_group_ids = var.security_groups
  subnet_id              = random_shuffle.subnets.result[count.index]
  count                  = var.instance_count

  root_block_device {
    volume_type           = "gp3"
    volume_size           = var.instance_root_device_size
    delete_on_termination = true
  }

  lifecycle {
    create_before_destroy = true
    ignore_changes        = [ami]
  }

  tags = merge(
    {
      Name      = "${var.name_prefix}-${count.index + 1}"
      ManagedBy = "terraform"
    },
    var.tags
  )
}

resource "aws_eip" "eip" {
  count = (var.create_elastic_ip) ? var.instance_count : 0

  tags = merge(
    {
      Name      = "${var.name_prefix}-address-${count.index + 1}"
      ManagedBy = "terraform"
    },
    var.tags
  )
}

resource "aws_eip_association" "eip_assoc" {
  count         = (var.create_elastic_ip) ? var.instance_count : 0
  instance_id   = aws_instance.instance[count.index].id
  allocation_id = aws_eip.eip[count.index].id
}

# TODO: implement AWS ALB when var.instance_count > 1

resource "cloudflare_record" "website" {
  count           = (var.website_domain != "" && var.cloudflare_zone_id != "") ? 1 : 0
  zone_id         = var.cloudflare_zone_id
  name            = var.website_domain
  value           = aws_eip.eip[0].public_ip
  type            = "A"
  proxied         = true
  allow_overwrite = true
  comment         = "Managed by terraform"
}