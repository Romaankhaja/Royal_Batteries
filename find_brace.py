import sys

with open('styles.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

level = 0
for i, line in enumerate(lines):
    # simple counting ignoring comments/strings for quick check
    left = line.count('{')
    right = line.count('}')
    
    level += left
    level -= right
    
    # If level drops below 0, there's an extra right brace
    if level < 0:
        print(f"Extra right brace around line {i+1}")
        level = 0 # reset
        continue
    
    # If a root-level like selector starts while we are heavily nested, it might be the culprit.
    # We expect level to be 0 at the start of most rules. 
    # Let's just track the line numbers where blocks open.
    # Or just print when encountering rules while level >= 1
    
# since we know there is 1 missing right brace, level will end at 1.
# Let's print the last few lines where a block opened.
level = 0
last_opened = []
for i, line in enumerate(lines):
    for char in line:
        if char == '{':
            level += 1
            last_opened.append((level, i+1, line.strip()))
        elif char == '}':
            level -= 1
            if last_opened and last_opened[-1][0] > level:
                last_opened.pop() # remove the last opened block at that level

for node in last_opened:
    print(f"Unclosed block opened at line {node[1]}: {node[2]}")
