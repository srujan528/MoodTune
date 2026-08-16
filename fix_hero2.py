with open('src/components/landing/Hero.tsx', 'r') as f:
    content = f.read()

# The issue: 
# 1. First function is complete at lines 303-335 (char positions ~13324-14553)
# 2. Then duplicate interface at lines 337-342
# 3. Then broken duplicate code at lines 344-355

# Find the complete first function (ends with '};\n\n' at around position 14553)
# Then find the duplicate interface (starts at 'interface MagneticLinkProps {')
# Then find the broken code

# Let's find the end of the first complete function
first_func_end = content.find('};\n\ninterface MagneticLinkProps {')
if first_func_end == -1:
    first_func_end = content.find('}\n\ninterface MagneticLinkProps {')

print(f'First func end: {first_func_end}')

if first_func_end != -1:
    # The content up to the end of the first function is good
    # Now we need to skip the duplicate interface and broken code
    # Find where the broken code ends (the second '}' after the broken code)
    broken_start = first_func_end + 1  # after the first '}\n\n'
    # Find the end of the broken code - it ends with '};\n\n' or similar
    broken_end = content.find('};\n\n', broken_start + 50)  # skip past the interface
    if broken_end == -1:
        broken_end = content.find('}\n\n', broken_start + 50)
    
    print(f'Broken start: {broken_start}')
    print(f'Broken end: {broken_end}')
    
    if broken_end != -1:
        # Keep: content up to first_func_end + 2 (to include '};\n\n')
        # Skip: broken_start to broken_end + 1
        # Keep: rest of content after broken_end
        new_content = content[:first_func_end + 2] + content[broken_end + 2:]
        with open('src/components/landing/Hero.tsx', 'w') as f:
            f.write(new_content)
        print('Fixed!')
    else:
        print('Could not find broken end')
else:
    print('Could not find first func end')
    # Try alternative
    first_func_end = content.find('function MagneticLink({ href, className, variant = "default", children }: MagneticLinkProps) {')
    second_func = content.find('function MagneticLink({ href, className, variant = "default", children }: MagneticLinkProps) {', first_func_end + 1)
    print(f'First: {first_func_end}, Second: {second_func}')