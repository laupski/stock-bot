output "ssh-command" {
    value = "ssh stock-bot@${digitalocean_droplet.stock-bot.ipv4_address}"
}
