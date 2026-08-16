import re

with open('src/lib/spotify/data/index.ts', 'r') as f:
    content = f.read()

# Replace the arrow function in map with a regular function
# Using a simpler string replacement instead of regex
content = content.replace(
    'artist_name: rec.track.artists.map((a: any) => a.name).join(", "),',
    'artist_name: rec.track.artists.map(function(a) { return a.name; }).join(", "),'
)

with open('src/lib/spotify/data/index.ts', 'w') as f:
    f.write(content)
print('Done')