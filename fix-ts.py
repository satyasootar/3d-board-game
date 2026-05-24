import os
import re

def fix_arena_canvas():
    path = "src/components/arena/ArenaCanvas.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Revert back to && but cast as any
    content = re.sub(
        r"\{effects\.bloom \? \((.*?)\) : null\}",
        r"{(effects.bloom && (\1)) as any}",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"\{effects\.glitch \? \((.*?)\) : null\}",
        r"{(effects.glitch && (\1)) as any}",
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r"\{effects\.noise \? \((.*?)\) : null\}",
        r"{(effects.noise && (\1)) as any}",
        content,
        flags=re.DOTALL
    )
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

def fix_ui_components():
    files = [
        "src/components/ui-customization/CustomizationPanel.tsx",
        "src/components/ui-game/GameHUD.tsx",
        "src/components/ui-game/MainMenu.tsx"
    ]
    
    for path in files:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Remove old ts-expect-error comments
        content = re.sub(r"\s*// @ts-expect-error framer-motion prop mismatch\n", "\n", content)
        content = re.sub(r"\s*\{/\* @ts-expect-error framer-motion prop mismatch \*/\}\n", "\n", content)
        
        # Add Motion variables below import
        if "const MotionDiv =" not in content:
            content = content.replace(
                "import { motion", 
                "import { motion"
            )
            # Find the import line and add definitions right after
            lines = content.split('\n')
            for i, line in enumerate(lines):
                if "import { motion" in line or "from 'framer-motion';" in line:
                    lines.insert(i + 1, "const MotionDiv = motion.div as any;")
                    lines.insert(i + 2, "const MotionButton = motion.button as any;")
                    break
            content = '\n'.join(lines)
            
        # Replace motion.div with MotionDiv
        content = content.replace("<motion.div", "<MotionDiv")
        content = content.replace("</motion.div>", "</MotionDiv>")
        
        # Replace motion.button with MotionButton
        content = content.replace("<motion.button", "<MotionButton")
        content = content.replace("</motion.button>", "</MotionButton>")
        
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

fix_arena_canvas()
fix_ui_components()
print("Fixed files!")
