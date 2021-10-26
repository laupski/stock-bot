output "droplet_ipv4" {
    value = "ssh stock-bot@${digitalocean_droplet.stock-bot.ipv4_address}"
}
