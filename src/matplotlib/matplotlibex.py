import matplotlib.pyplot as plt
import pandas as pd

colors = []
weights = []
df = pd.read_csv("cars-sample.csv")

for index, row in df.iterrows():
  # set colors
  manufacturer = row['Manufacturer']
  if(manufacturer == 'bmw'):
    colors.append((1.0, 0.0, 0.0, 0.5))
  elif(manufacturer == 'mercedes'):
    colors.append((0.0, 0.0, 1.0, 0.5))
  elif(manufacturer == 'toyota'):
    colors.append((1.0, 0.75, 0.79, 0.5))
  elif(manufacturer == 'honda'):
    colors.append((0.0, 1.0, 0.0, 0.5))
  elif(manufacturer == 'ford'):
    colors.append((0.75, 1.0, 0.0, 0.5))

  # set weights
  weights.append(row['Weight'] / 50.0)
  
df.plot.scatter(title="matplotlib", x='Weight', y='MPG', s=weights, c=colors, grid=True)
plt.show()