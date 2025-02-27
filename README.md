# CommunX

### Setting Up Dev Environment

First, you need to install pnpm if you don't have it already:

```bash
# Using npm
npm install -g pnpm

# Using homebrew (macOS)
brew install pnpm

# Using curl (Unix/macOS)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### Running Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/communx.git
cd communx
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### How to Contribute

1. Fork the repository on GitHub
2. Clone your forked repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/communx.git
    cd communx
    ```
3. Set up your development environment by following the "Setting Up Dev Environment" steps above
4. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
5. Make your changes and commit them with descriptive commit messages
6. Push your changes to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```
7. Create a Pull Request from your forked repository to our main repository
8. Wait for review and address any feedback
