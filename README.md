# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f47c2f5c-8476-4828-b83a-8e7d5cc3fd23

遊戲規則：

🃏 牌庫與廢牌堆
牌庫（左上角）：點擊抽取3張牌到廢牌堆
廢牌堆：顯示最多3張牌，可以使用最上層的牌
牌庫空了會顯示「重置牌堆」，點擊可將廢牌重新放回牌庫
🎯 移動規則
基礎堆（右上角4個位置）
必須從A開始，按花色順序疊放（A→2→3...→K）
只能放相同花色的牌
目標：將所有牌按花色順序放入基礎堆
牌陣（下方7列）
降序排列：K→Q→J→10...→2→A
顏色交替：紅黑相間（紅桃/方塊 vs 黑桃/梅花）
空列只能放K
可以移動連續的有效序列
🎮 操作方式
點擊選取牌（會有金色邊框）
點擊目標位置移動
翻開的牌才能移動
移動牌後會自動翻開下方的牌
獲勝條件：將所有52張牌按花色順序放入4個基礎堆！

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f47c2f5c-8476-4828-b83a-8e7d5cc3fd23) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f47c2f5c-8476-4828-b83a-8e7d5cc3fd23) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
