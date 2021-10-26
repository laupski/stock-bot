output "droplet_ipv4" {
    value = "ssh root@${digitalocean_droplet.stock-bot.ipv4_address}"
}
