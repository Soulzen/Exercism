type Item = {
  weight: number
  value: number
}

export function maximumValue({
  maximumWeight,
  items
}: {
  maximumWeight: number
  items: Item[]
}): number {
  const dp = new Array(items.length + 1)
    .fill(0)
    .map(() => new Array(maximumWeight + 1).fill(0))

  for (let currentItem = 1; currentItem <= items.length; currentItem++) {
    for (
      let currentWeight = 0;
      currentWeight <= maximumWeight;
      currentWeight++
    ) {
      const item = items[currentItem - 1]
      if (item.weight > currentWeight) {
        dp[currentItem][currentWeight] = dp[currentItem - 1][currentWeight]
      } else {
        dp[currentItem][currentWeight] = Math.max(
          dp[currentItem - 1][currentWeight],
          dp[currentItem - 1][currentWeight - item.weight] + item.value
        )
      }
    }
  }

  return dp[items.length][maximumWeight]
}
