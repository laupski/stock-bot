terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# Create a new SSH key
resource "digitalocean_ssh_key" "default" {
  name       = "default-key"
  public_key = file("~/.ssh/id_ed25519.pub")
}

# Create a new Droplet using the SSH key
resource "digitalocean_droplet" "stock-bot" {
  image    = "ubuntu-18-04-x64"
  name     = "stock-bot"
  region   = "nyc"
  size     = "s-1vcpu-1gb"
  ssh_keys = [digitalocean_ssh_key.default.fingerprint]
}
