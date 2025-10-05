# Ra.One AI Arena - Hackathon Project

An AI-powered fighting game inspired by the Bollywood movie Ra.One, featuring dynamic character selection, AI-generated combat moves, and real-time dialogue generation.

## Features

### Character Selection
- Choose between **G.One** (Hero) or **Ra.One** (Villain)
- Each character has unique stats, fighting styles, and AI personalities
- Visual character cards with detailed descriptions

### AI-Powered Combat
- **Dynamic Dialogue Generation**: AI creates contextual battle dialogue
- **Adaptive Combat Moves**: AI generates new special moves based on prompts
- **Behavioral Adaptation**: Boss AI learns and adapts to player fighting patterns
- **Real-time AI Processing**: Live AI generation during gameplay

### Judge Interaction
- **Custom AI Prompts**: Judges can input custom instructions to modify AI behavior
- **Live Combat Modification**: Change fighting styles and moves in real-time
- **AI Combat Generation**: Generate entirely new combat sequences on demand

## 🚀 Quick Start

### Option 1: Simple Setup (HTML File Only)
```bash
1. Save the main code as 'index.html'
2. Open in any web browser
3. Play immediately with mock AI
```

### Option 2: Full AI Integration
```bash
1. Clone this repository
2. Add your API keys to config/api-keys.js
3. Open index.html in browser
4. Experience real AI generation
```

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Canvas API)
- **AI Integration**: OpenAI GPT API, ElevenLabs TTS
- **Real-time Rendering**: HTML5 Canvas with 60fps game loop
- **Responsive Design**: Works on desktop and mobile

## 📁 Project Structure

```
Ra.One
├── index.html              # Main game file
├── js/
│   ├── ai-integration.js   # Real AI API calls
│   ├── character-data.js   # Character definitions
│   └── combat-moves.js     # Move system
├── assets/
│   ├── images/            # Character images
│   └── audio/             # Sound effects
├── css/
│   └── styles.css         # Additional styling
└── config/
    └── api-keys.js        # API configuration
```

## 🔧 Setup Instructions

### 1. Basic Setup (No APIs)
- Just open `index.html` in your browser
- Game works with mock AI dialogue and moves
- Perfect for testing and basic gameplay

### 2. AI Integration Setup

#### Get API Keys:
1. **OpenAI API Key**:
   - Go to https://platform.openai.com
   - Create account and get API key
   - Add to `js/ai-integration.js`

2. **ElevenLabs API Key** (Optional for voice):
   - Go to https://elevenlabs.io
   - Create account and get API key
   - Add to `js/ai-integration.js`

#### Update API Configuration:
```javascript
// In js/ai-integration.js
const API_CONFIG = {
    openai: {
        key: 'your-actual-openai-key-here',
        // ... rest of config
    }
};
```

### 3. Add Character Images
- Place your character images in `assets/images/`
- Update image sources in `index.html`:
```html
<!-- Replace these lines in the character cards -->
<div class="character-image" style="background-image: url('assets/images/hero.jpg')">
<div class="character-image" style="background-image: url('assets/images/villain.jpg')">
```

## 🎯 Hackathon Demo Features

### For Judges:
1. **Character Selection**: Shows clear choice between hero/villain
2. **AI Dialogue Generation**: Real-time contextual dialogue
3. **Adaptive Combat**: AI learns from player behavior
4. **Custom Prompts**: Judges can modify AI behavior live
5. **Visual Effects**: Engaging combat animations and effects

### Demo Script (5 minutes):
1. **Character Selection** (30s): Show both characters and selection
2. **Basic Combat** (90s): Demonstrate fighting mechanics
3. **AI Dialogue** (60s): Show contextual AI-generated dialogue
4. **Judge Interaction** (90s): Let judges input custom prompts
5. **AI Adaptation** (60s): Show boss adapting to player behavior

## 🏆 Hackathon Categories

- **Best Use of AI**: Dynamic dialogue and move generation
- **Most Innovative**: Real-time AI adaptation and judge interaction
- **Best Gaming Experience**: Engaging combat with AI personalities
- **Technical Excellence**: Clean code architecture and API integration

## 📝 Game Controls

- **WASD / Arrow Keys**: Move character
- **SPACE**: Attack
- **SHIFT**: Block/Special defense
- **Q**: Trigger AI special move
- **Text Input**: Custom AI prompts for judges

## 🚀 Advanced Features

### AI Systems:
- **Contextual Dialogue**: AI generates appropriate responses based on game state
- **Combat Adaptation**: Boss learns player patterns and counters them
- **Dynamic Move Generation**: New special moves created based on prompts
- **Behavioral Personalities**: Different AI personalities for each character

### Technical Highlights:
- **Real-time AI Integration**: Live API calls during gameplay
- **Fallback Systems**: Graceful degradation if APIs fail
- **Responsive Design**: Works on multiple screen sizes
- **Performance Optimized**: 60fps gameplay with AI processing

## 🔍 Troubleshooting

### Common Issues:
1. **AI not generating**: Check API keys in `js/ai-integration.js`
2. **Game not loading**: Ensure all files are in correct directories
3. **Images not showing**: Update image paths in HTML
4. **API errors**: Check console for specific error messages

### Development Mode:
- Open browser developer tools (F12)
- Check console for error messages
- Use network tab to monitor API calls

## 🎨 Customization

### Adding New Characters:
1. Add character definition to `CHARACTERS` object
2. Create character card in HTML
3. Add character images to assets folder

### Modifying AI Behavior:
1. Edit prompts in `generateRealAIDialogue()`
2. Adjust move generation in `generateRealAICombatMoves()`
3. Customize adaptation logic in `generateAIBehaviorPattern()`

## 📄 License

This project is created for hackathon purposes. Feel free to use and modify for educational and competitive purposes.

## 🤝 Contributing

This is a hackathon project, but contributions and improvements are welcome!

