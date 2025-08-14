// Given data
const users = [
  { id: 1, name: "Alice", country: "USA", age: 25 },
  { id: 2, name: "Bob", country: "India", age: 30 },
  { id: 3, name: "Charlie", country: "USA", age: 35 },
  { id: 4, name: "David", country: "UK", age: 30 },
  { id: 5, name: "Eve", country: "India", age: 22 },
  { id: 6, name: "Alice", country: "USA", age: 25 },
];


// 1. Reverse array without .reverse()
const reversed = [];
for (let i = users.length - 1; i >= 0; i--) {
  reversed.push(users[i]);
}
console.log("Reversed:", reversed);

// 2. Remove duplicate users (by id)
const uniqueUsers = users.filter(
  (user, index, self) => index === self.findIndex(u => u.id === user.id)
);
console.log("Unique Users:", uniqueUsers);

// 3. Flat array of all countries without duplicates
const countries = [...new Set(users.map(user => user.country))];
console.log("Countries:", countries);

// 4. Group users by country
const groupedByCountry = users.reduce((acc, user) => {
  if (!acc[user.country]) {
    acc[user.country] = [];
  }
  acc[user.country].push(user);
  return acc;
}, {});
console.log("Grouped:", groupedByCountry);

// 5. Users older than 25 sorted by age ascending
const olderThan25Sorted = users
  .filter(user => user.age > 25)
  .sort((a, b) => a.age - b.age);
console.log("Older than 25 sorted:", olderThan25Sorted);

// 6. Array of just names
const names = users.map(user => user.name);
console.log("Names:", names);



