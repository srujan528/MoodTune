with open('src/components/landing/Hero.tsx', 'r') as f:
    content = f.read()

# The structure should be:
# 1. Hero component
# 2. ScrollIndicator component
# 3. MagneticLink component
# 4. MagneticLinkProps interface

# Find the end of ScrollIndicator component
scroll_end = content.find('};\n\n\n  const handleMouseLeave')
if scroll_end == -1:
    scroll_end = content.find('}\n\n\n  const handleMouseLeave')
    
print(f'ScrollIndicator end: {scroll_end}')

if scroll_end != -1:
    # Find the end of the broken code (the last '};\n' or '}\n')
    broken_end = content.rfind('};\n')
    print(f'Broken end: {broken_end}')
    
    # Keep content up to scroll_end + 2 (to include the closing }; of ScrollIndicator)
    # Then add the proper MagneticLink component
    # Then add the interface
    
    good_part = content[:scroll_end + 2]  # includes the closing }; of ScrollIndicator
    
    magnetic_link = '''
function MagneticLink({ href, className, variant = "default", children }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMobile || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.12, y: y * 0.12 });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}

interface MagneticLinkProps {
  href: string;
  className?: string;
  variant?: "default" | "outline";
  children: React.ReactNode;
}
'''
    
    new_content = good_part + magnetic_link
    
    with open('src/components/landing/Hero.tsx', 'w') as f:
        f.write(new_content)
    print('Fixed Hero.tsx')
else:
    print('Could not find ScrollIndicator end')