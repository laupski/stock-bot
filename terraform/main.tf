terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

data "template_file" "pm2" {
  template = file("${path.module}/templates/pm2.tpl")

  vars = {
    CLIENTID = var.CLIENTID
    GUILDID = var.GUILDID
    BOT_TOKEN = var.BOT_TOKEN
    ALPHAKEY = var.ALPHAKEY
  }
}

data "template_file" "cloud-init" {
  template = file("${path.module}/templates/cloud-init.tpl")

  vars = {
    userdata_sshkey = var.sshkey
    userdata_pm2 = base64encode(data.template_file.pm2.rendered)
    userdata_motd = base64encode(file("${path.module}/files/motd"))
    userdata_motd_script = base64encode(file("${path.module}/files/motd.sh"))
    userdata_giturl = var.git_url
  }
}

# Create a new SSH key
resource "digitalocean_ssh_key" "default" {
  name       = "default-key"
  public_key = var.sshkey
}

# Create a new Droplet using the SSH key
resource "digitalocean_droplet" "stock-bot" {
  image    = "ubuntu-18-04-x64"
  name     = "stock-bot"
  region   = "nyc1"
  size     = "s-1vcpu-1gb"
  ssh_keys = [digitalocean_ssh_key.default.fingerprint]
  user_data = data.template_file.cloud-init.rendered
}
