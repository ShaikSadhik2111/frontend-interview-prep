// Day 22 Exercises — State, Events & Controlled Components

export function Exercise1Counter() {
  // Build increment, decrement and reset.
  // Count must never go below 0.
  return <div>TODO</div>;
}

export function Exercise2NameInput() {
  // Build a controlled name input.
  return <div>TODO</div>;
}

export function Exercise3UserForm() {
  // Build controlled name, email and role fields.
  // Submit and add a user to state.
  return <div>TODO</div>;
}

export function Exercise4ToggleUser() {
  // Toggle each user's online/offline status.
  return <div>TODO</div>;
}

export function Exercise5DeleteUser() {
  // Delete a user with an immutable filter update.
  return <div>TODO</div>;
}

export function Exercise6UserManagementPanel() {
  // Final challenge:
  // name + email + role + add + delete + toggle + statistics.
  return <div>TODO</div>;
}

// Hints:
//
// setUsers((current) => [...current, newUser]);
//
// setUsers((current) =>
//   current.map((user) =>
//     user.id === id ? { ...user, isOnline: !user.isOnline } : user
//   )
// );
//
// setUsers((current) => current.filter((user) => user.id !== id));
