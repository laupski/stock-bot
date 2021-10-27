variable "CLIENTID" {
    description = "Client ID of the stock-bot"
}

variable "GUILDID" {
    description = "Guild ID of the discord server"
}

variable "ALPHAKEY" {
    description = "Alpha Vantage API key"
}

variable "BOT_TOKEN" {
    description = "Discord bot token for accessing the API"
}

variable "sshkey" {
  description = "Public ssh key"
}

variable "git_url" {
  description = "Git URL"
  default = "https://github.com/laupski/stock-bot.git"
}
