if status is-interactive
    # Commands to run in interactive sessions can go here
    fastfetch
    remcli
end

starship init fish | source

# Created by `pipx` on 2025-09-17 12:25:26
set PATH $PATH /home/user/.local/bin

# SSH Agent setup
if not set -q SSH_AUTH_SOCK
    set -x SSH_AUTH_SOCK /tmp/ssh-agent.socket
    ssh-agent -c -a $SSH_AUTH_SOCK > /dev/null
end

# Проверить существующие ключи
if ssh-add -l > /dev/null 2>&1
    echo "SSH keys loaded"
else
    # Автоматически добавить ключи при запуске
    ssh-add ~/.ssh/id_ed25519 2>/dev/null
    ssh-add ~/.ssh/id_rsa 2>/dev/null
    ssh-add ~/key
end
