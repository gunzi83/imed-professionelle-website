#!/bin/bash

# 🛡️ Automatic Backup Script für imed2230 Website
# Usage: ./backup.sh [create|restore|list]

set -e

REPO_DIR="/home/user/webapp"
cd "$REPO_DIR"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function: Create backup
create_backup() {
    echo -e "${BLUE}🛡️ Creating backup before changes...${NC}"
    
    # Check if working directory is clean
    if ! git diff-index --quiet HEAD --; then
        echo -e "${YELLOW}⚠️ You have uncommitted changes. Commit or stash them first!${NC}"
        git status
        exit 1
    fi
    
    # Create backup branch with timestamp
    BACKUP_BRANCH="backup-$(date +%Y%m%d-%H%M%S)"
    git checkout -b "$BACKUP_BRANCH"
    
    echo -e "${GREEN}✅ Backup created: $BACKUP_BRANCH${NC}"
    
    # Return to main branch
    git checkout main
    
    echo -e "${BLUE}📝 You are now on main branch and can make changes safely.${NC}"
    echo -e "${YELLOW}💡 To restore this backup later, run: ./backup.sh restore $BACKUP_BRANCH${NC}"
    
    # Store backup info
    echo "$BACKUP_BRANCH" > .last_backup
}

# Function: List all backups
list_backups() {
    echo -e "${BLUE}📋 Available backups:${NC}"
    git branch | grep "backup-" | sed 's/^[ \t]*//' | sort -r
    
    if [ -f .last_backup ]; then
        LAST_BACKUP=$(cat .last_backup)
        echo -e "${GREEN}🔸 Last backup: $LAST_BACKUP${NC}"
    fi
}

# Function: Restore backup
restore_backup() {
    local backup_branch="$1"
    
    if [ -z "$backup_branch" ]; then
        echo -e "${RED}❌ Please specify backup branch name${NC}"
        echo -e "${YELLOW}Available backups:${NC}"
        list_backups
        exit 1
    fi
    
    # Check if backup branch exists
    if ! git branch | grep -q "$backup_branch"; then
        echo -e "${RED}❌ Backup branch '$backup_branch' not found${NC}"
        list_backups
        exit 1
    fi
    
    echo -e "${YELLOW}⚠️ This will discard all current changes and restore to: $backup_branch${NC}"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Discard current changes
        git checkout -- .
        git clean -fd
        
        # Switch to backup
        git checkout "$backup_branch"
        
        # Create new main branch from backup
        git checkout -b "main-restored-$(date +%Y%m%d-%H%M%S)"
        
        echo -e "${GREEN}✅ Successfully restored from backup: $backup_branch${NC}"
        echo -e "${BLUE}📝 You are now on a restored branch. To make this the new main:${NC}"
        echo -e "${YELLOW}   git branch -D main${NC}"
        echo -e "${YELLOW}   git branch -m main${NC}"
        echo -e "${YELLOW}   npm run pm2:restart${NC}"
    else
        echo -e "${BLUE}💭 Restore cancelled${NC}"
    fi
}

# Function: Emergency reset
emergency_reset() {
    echo -e "${RED}🚨 EMERGENCY RESET - This will discard ALL uncommitted changes!${NC}"
    read -p "Are you ABSOLUTELY sure? (type 'YES'): " -r
    
    if [[ $REPLY == "YES" ]]; then
        git checkout -- .
        git clean -fd
        echo -e "${GREEN}✅ All changes discarded, back to last commit${NC}"
    else
        echo -e "${BLUE}💭 Emergency reset cancelled${NC}"
    fi
}

# Function: Quick commit and push
quick_save() {
    local message="$1"
    
    if [ -z "$message" ]; then
        message="Quick save: $(date)"
    fi
    
    echo -e "${BLUE}💾 Quick saving changes...${NC}"
    
    git add .
    git commit -m "$message"
    git push origin main
    npm run pm2:restart
    
    echo -e "${GREEN}✅ Changes saved and deployed!${NC}"
}

# Main script logic
case "$1" in
    "create"|"c")
        create_backup
        ;;
    "restore"|"r")
        restore_backup "$2"
        ;;
    "list"|"l")
        list_backups
        ;;
    "emergency"|"e")
        emergency_reset
        ;;
    "save"|"s")
        quick_save "$2"
        ;;
    *)
        echo -e "${BLUE}🛡️ imed2230 Website Backup Tool${NC}"
        echo
        echo "Usage: $0 [command] [options]"
        echo
        echo "Commands:"
        echo -e "  ${GREEN}create (c)${NC}     Create backup before making changes"
        echo -e "  ${GREEN}restore (r)${NC}    Restore from backup: $0 restore backup-20241220-143022"
        echo -e "  ${GREEN}list (l)${NC}       List all available backups"
        echo -e "  ${GREEN}emergency (e)${NC}  Emergency reset - discard all changes"
        echo -e "  ${GREEN}save (s)${NC}       Quick commit and push: $0 save \"message\""
        echo
        echo "Examples:"
        echo "  $0 create                           # Create backup before changes"
        echo "  $0 restore backup-20241220-143022  # Restore specific backup"
        echo "  $0 list                             # Show all backups"
        echo "  $0 emergency                        # Discard all changes"
        echo "  $0 save \"Updated opening hours\"     # Quick save and deploy"
        ;;
esac