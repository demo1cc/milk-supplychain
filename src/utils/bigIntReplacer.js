export default function bigIntReplacer(key, value) {
    if (typeof value === 'bigint') {
      return value.toString(); // Convert BigInt to string
    }
    return value; // Return other types unchanged
  }