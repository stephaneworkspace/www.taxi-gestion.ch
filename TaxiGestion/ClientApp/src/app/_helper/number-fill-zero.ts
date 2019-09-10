export function pad(
    a, // the number to convert 
    b // number of resulting characters
){
return (
    1e15 + a + // combine with large number
    "" // convert to string
).slice(-b) // cut leading "1"
}