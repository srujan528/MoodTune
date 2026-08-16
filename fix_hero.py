with open('src/components/landing/Hero.tsx', 'r') as f:
    content = f.read()

# Find both MagneticLink functions
search_str = 'function MagneticLink({ href, className, variant = "default", children }: MagneticLinkProps) {'
first_func = content.find(search_str)
second_func = content.find(search_str, first_func + 1)

print(f'First at: {first_func}')
print(f'Second at: {second_func}')

if second_func != -1:
    # Find the end of the second function
    func_end = content.find('\n}\n\n', second_func)
    if func_end == -1:
        func_end = content.find('}\n', second_func)
    print(f'Second func ends at: {func_end}')
    if func_end != -1:
        # Remove the second function including the preceding blank line
        new_content = content[:second_func - 1] + content[func_end + 1:]
        with open('src/components/landing/Hero.tsx', 'w') as f:
            f.write(new_content)
        print('Fixed Hero.tsx')
    else:
        print('Could not find end of second function')