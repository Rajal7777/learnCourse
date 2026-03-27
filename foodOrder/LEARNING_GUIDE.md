# 🍔 FoodOrder Project - Complete Learning Guide & Mentor Notes

> **A comprehensive guide to master React Hooks, HTTP Requests, and Context API through the FoodOrder Project**

---

## 📚 Table of Contents

1. [Introduction](#introduction)
2. [React Hooks Masterclass](#react-hooks-masterclass)
3. [HTTP/API Requests Complete Guide](#httpapi-requests-complete-guide)
4. [Context API Deep Dive](#context-api-deep-dive)
5. [FoodOrder Project Code Walkthrough](#foodorder-project-code-walkthrough)
6. [Best Practices & Tips](#best-practices--tips)

---

# 🎯 Introduction

The **FoodOrder** project is a full-stack React application that teaches you:

- ✅ Component-based architecture
- ✅ State management with Context API
- ✅ Async operations with fetch API
- ✅ Complex reducer patterns
- ✅ Modal management
- ✅ Backend communication

---

# 🎣 React Hooks Masterclass

Hooks are functions that let you "hook into" React features. They're the modern way to manage state and side effects in functional components.

## 1. useState Hook

### What is useState?

`useState` is a Hook that lets you add state to functional components. Before hooks, only class components could have state.

### Why we use it?

- **Store data** that changes over time
- **Trigger re-renders** when data changes
- **Manage UI interactions** (form inputs, toggles, etc.)

### Syntax

```javascript
const [state, setState] = useState(initialValue);
```

### Parameters

- `initialValue`: The starting value of the state (can be any type)

### Returns

- `state`: Current value
- `setState`: Function to update the state

### Sample Code

```javascript
import { useState } from "react";

function Counter() {
  // Declare state variable 'count' with initial value 0
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  function handleIncrement() {
    setCount(count + 1); // Update state
  }

  function handleNameChange(e) {
    setName(e.target.value); // Update with input value
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>

      <input
        value={name}
        onChange={handleNameChange}
        placeholder="Enter name"
      />
      <p>Name: {name}</p>

      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}
```

### Key Points

- ⚠️ **Never** mutate state directly: `state = newValue` ❌
- ✅ **Always** use setState: `setState(newValue)` ✅
- Multiple `useState` calls are allowed in one component
- State updates are **asynchronous**
- Each `setState` call triggers a **re-render**

---

## 2. useContext Hook

### What is useContext?

`useContext` is a Hook that lets you subscribe to context without nesting. It allows components to share data without passing props through every level.

### Why we use it?

- **Avoid prop drilling** (passing props through many levels)
- **Share global state** (themes, user data, authentication)
- **Clean component tree** (keep components focused)

### Syntax

```javascript
const value = useContext(MyContext);
```

### Sample Code - Theme Example

```javascript
// Step 1: Create Context
import { createContext, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Step 2: Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Step 3: Use in App
function App() {
  return (
    <ThemeProvider>
      <Header />
      <MainContent />
    </ThemeProvider>
  );
}

// Step 4: Consume Context in any component
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header style={{ background: theme === "light" ? "#fff" : "#333" }}>
      <h1>{theme} mode</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
}
```

### Steps to Use Context

1. **Create Context**: `const Context = createContext(defaultValue)`
2. **Create Provider**: Wraps components with context
3. **Wrap App**: `<ContextProvider><App/></ContextProvider>`
4. **Use Hook**: `const value = useContext(Context)`

### Key Points

- Context is useful for **global state** (user data, theme, language)
- Not ideal for **frequently changing data** (use Redux/Zustand for that)
- Any component deep in the tree can access the context without prop drilling

---

## 3. useReducer Hook

### What is useReducer?

`useReducer` is a Hook for managing complex state logic. It's similar to `useState` but accepts a **reducer function**.

### Why we use it?

- **Complex state logic** with multiple sub-values
- **Multiple related state updates**
- **Predictable state transitions** (like Redux)
- **Performance optimization** (pass dispatch to child components)

### Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Sample Code - Cart Management

```javascript
import { useReducer } from "react";

// Step 1: Define reducer function
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Check if item already exists
    const existingItem = state.items.find((item) => item.id === action.item.id);

    if (existingItem) {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    } else {
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    }
  }

  if (action.type === "REMOVE_ITEM") {
    const item = state.items.find((i) => i.id === action.id);

    if (item.quantity === 1) {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };
    } else {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      };
    }
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

// Step 2: Use in component
function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  function handleAddItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function handleRemoveItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  function handleClearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <div>
      <h2>Cart Items: {cart.items.length}</h2>
      <button
        onClick={() => handleAddItem({ id: 1, name: "Pizza", price: 10 })}
      >
        Add Pizza
      </button>
      <button onClick={() => handleRemoveItem(1)}>Remove Item</button>
      <button onClick={handleClearCart}>Clear Cart</button>

      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
```

### Reducer Function Pattern

```javascript
function reducer(state, action) {
  // action is always an object with at least a 'type' property

  if (action.type === "ACTION_NAME") {
    // Return new state
    return { ...state /* changes */ };
  }

  // Always return state if action type doesn't match
  return state;
}
```

### Key Points

- Reducer must be a **pure function** (no side effects)
- Always **return new state**, never mutate the original
- Action can have any shape: `{ type: 'ADD', payload: data }`
- Used with Context for **global state management**

---

## 4. useEffect Hook

### What is useEffect?

`useEffect` is a Hook that lets you perform side effects in functional components (data fetching, subscriptions, DOM updates, etc.)

### Why we use it?

- **Fetch data** from servers
- **Set up subscriptions** (WebSockets, event listeners)
- **Update document title** or DOM
- **Clean up** resources when component unmounts

### Syntax

```javascript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]);
```

### Parameters

- **Effect function**: Code to run
- **Dependency array** (optional):
  - **Empty []**: Runs once after first render
  - **No array**: Runs after every render (⚠️ can cause infinite loops)
  - **[var1, var2]**: Runs when var1 or var2 change

### Sample Code - Data Fetching

```javascript
import { useState, useEffect } from "react";

function MealsComponent() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/meals");

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const data = await response.json();
        setMeals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMeals();
  }, []); // Run only once on mount

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {meals.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
```

### Sample Code - Event Listener with Cleanup

```javascript
import { useEffect } from "react";

function WindowResizer() {
  useEffect(() => {
    function handleResize() {
      console.log("Window resized to:", window.innerWidth);
    }

    // Subscribe to resize event
    window.addEventListener("resize", handleResize);

    // Cleanup: Remove listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Run only once

  return <div>Resize the window</div>;
}
```

### Key Points

- ✅ Use for **async operations**: fetch, API calls
- ✅ Use for **side effects**: DOM manipulation, event listeners
- ⚠️ **Cleanup function** prevents memory leaks
- Dependencies array controls **when** the effect runs
- Order matters: effects run in order of declaration

---

## 5. Custom Hooks

### What is a Custom Hook?

A custom hook is a JavaScript function that uses React hooks inside it. It lets you extract component logic into reusable functions.

### Why we use it?

- **Reuse logic** across multiple components
- **Keep components clean** and focused
- **Share stateful logic** without render props or HOCs

### Sample Code - useFormInput Hook

```javascript
import { useState } from "react";

// Custom Hook
function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (e) => setValue(e.target.value),
    },
    reset: () => setValue(initialValue),
  };
}

// Usage in component
function LoginForm() {
  const email = useFormInput("");
  const password = useFormInput("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Email:", email.value, "Password:", password.value);
    email.reset();
    password.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" {...email.bind} />
      <input type="password" placeholder="Password" {...password.bind} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### Sample Code - useFetch Hook

```javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

// Usage
function App() {
  const {
    data: meals,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/meals");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {meals?.map((meal) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
}
```

### Rules of Hooks

1. ✅ Call hooks at the **top level** (not inside loops, conditions, nested functions)
2. ✅ Call hooks from **React components** or **custom hooks**
3. ✅ Use custom hook names starting with **use**: `useCustom`, `useFetch`, etc.

---

# 🌐 HTTP/API Requests Complete Guide

HTTP (HyperText Transfer Protocol) is how clients communicate with servers. Understanding HTTP requests is crucial for backend communication.

## HTTP Methods

### 1. GET - Retrieve Data

**Purpose**: Fetch data from server (read-only, no side effects)

**Characteristics**:

- Safe (doesn't modify data)
- Idempotent (same request = same result)
- Parameters in URL query string
- Visible in browser history

**Syntax**

```javascript
const response = await fetch(url);
const data = await response.json();
```

**Sample Code**

```javascript
// Get all meals
async function getMeals() {
  try {
    const response = await fetch("http://localhost:3000/meals");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const meals = await response.json();
    console.log("Meals:", meals);
    return meals;
  } catch (error) {
    console.error("Error fetching meals:", error.message);
  }
}

// Get specific meal with query parameters
async function searchMeals(searchTerm) {
  try {
    const response = await fetch(
      `http://localhost:3000/meals?search=${searchTerm}`,
    );
    const meals = await response.json();
    return meals;
  } catch (error) {
    console.error("Error:", error);
  }
}
```

**Example GET Request URL**

```
GET http://localhost:3000/meals
GET http://localhost:3000/meals?id=m1
GET http://localhost:3000/meals?category=pizza&sort=price
```

### 2. POST - Create Data

**Purpose**: Send data to server to create a new resource

**Characteristics**:

- Not safe (modifies data on server)
- Not idempotent (repeated requests create multiple resources)
- Data in request body
- Returns created resource

**Syntax**

```javascript
const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});
const result = await response.json();
```

**Sample Code**

```javascript
// Create new order
async function createOrder(orderData) {
  try {
    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: [
            { id: "m1", name: "Pizza", price: 12.99, quantity: 2 },
            { id: "m2", name: "Salad", price: 7.99, quantity: 1 },
          ],
          customer: {
            name: "John Doe",
            email: "john@example.com",
            street: "123 Main St",
            "postal-code": "12345",
            city: "City Name",
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create order");
    }

    const result = await response.json();
    console.log("Order created:", result);
    return result;
  } catch (error) {
    console.error("Error creating order:", error.message);
  }
}
```

**Request Body Example**

```json
{
  "order": {
    "items": [{ "id": "m1", "name": "Pizza", "price": 12.99, "quantity": 2 }],
    "customer": {
      "name": "John Doe",
      "email": "john@example.com",
      "street": "123 Main St",
      "postal-code": "12345",
      "city": "New York"
    }
  }
}
```

### 3. PUT - Replace Entire Resource

**Purpose**: Replace entire resource with new data

**Characteristics**:

- Replaces complete resource
- Idempotent (same request multiple times = same result)
- Data in request body

**Sample Code**

```javascript
async function updateMeal(mealId, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/meals/${mealId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: mealId,
        name: updatedData.name,
        price: updatedData.price,
        description: updatedData.description,
        image: updatedData.image,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update meal");
    }

    const updated = await response.json();
    console.log("Meal updated:", updated);
    return updated;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage
updateMeal("m1", {
  name: "Deluxe Pizza",
  price: 14.99,
  description: "Premium pizza with extra toppings",
  image: "images/pizza.jpg",
});
```

### 4. PATCH - Partial Update

**Purpose**: Update only specific fields of a resource

**Characteristics**:

- Partial update (only send changed fields)
- Not guaranteed idempotent
- Data in request body

**Sample Code**

```javascript
async function updateMealPrice(mealId, newPrice) {
  try {
    const response = await fetch(`http://localhost:3000/meals/${mealId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        price: newPrice, // Only update price
      }),
    });

    const updated = await response.json();
    console.log("Price updated:", updated);
    return updated;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage
updateMealPrice("m1", 15.99);
```

### 5. DELETE - Remove Resource

**Purpose**: Delete a resource from server

**Characteristics**:

- Removes resource
- Idempotent (deleting twice = same result, 404 on second)
- Usually returns empty response or confirmation

**Sample Code**

```javascript
async function deleteOrder(orderId) {
  try {
    const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete order");
    }

    console.log("Order deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
}

// Usage
deleteOrder("order123");
```

---

## HTTP Status Codes

| Code    | Meaning             | Example                           |
| ------- | ------------------- | --------------------------------- |
| **2xx** | ✅ Success          |                                   |
| 200     | OK                  | Request successful, data returned |
| 201     | Created             | Resource created successfully     |
| **3xx** | 🔄 Redirect         |                                   |
| 301     | Moved Permanently   | Resource moved to new URL         |
| **4xx** | ⚠️ Client Error     |                                   |
| 400     | Bad Request         | Invalid request data              |
| 401     | Unauthorized        | Authentication required           |
| 403     | Forbidden           | Access denied                     |
| 404     | Not Found           | Resource doesn't exist            |
| **5xx** | ❌ Server Error     |                                   |
| 500     | Internal Error      | Server error                      |
| 503     | Service Unavailable | Server down                       |

---

## Request/Response Structure

### Request Structure

```javascript
// URL
const url = 'http://localhost:3000/meals';

// Headers
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer token123'
}

// Body (for POST, PUT, PATCH)
{
  "key": "value",
  "data": { "nested": "object" }
}
```

### Response Structure

```javascript
const response = await fetch(url);

// Response object properties
response.status; // 200, 404, 500, etc.
response.statusText; // 'OK', 'Not Found', etc.
response.headers; // Headers object
response.ok; // true if status 200-299
response.body; // Stream (use .json(), .text())

// Parsing response
const json = await response.json(); // Parse as JSON
const text = await response.text(); // Parse as text
const blob = await response.blob(); // Parse as binary
```

---

## Error Handling Patterns

### Try-Catch Pattern

```javascript
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/meals");

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors, parsing errors, etc.
    console.error("Error:", error.message);
    throw error;
  }
}
```

### With Finally

```javascript
async function fetchWithLoading() {
  let isLoading = true;

  try {
    const response = await fetch("http://localhost:3000/meals");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    isLoading = false;
    console.log("Request complete");
  }
}
```

---

## Complete HTTP Examples

### GET All Data + Error Handling

```javascript
async function getAvailableMeals() {
  const baseUrl = "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/meals`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch meals: ${response.status} ${response.statusText}`,
      );
    }

    const meals = await response.json();
    console.log("Successfully fetched meals:", meals);
    return meals;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error - check if server is running");
    } else {
      console.error("Error:", error.message);
    }
    throw error;
  }
}
```

### POST with Validation

```javascript
async function submitOrder(orderData) {
  const baseUrl = "http://localhost:3000";

  // Validate input
  if (!orderData.items || orderData.items.length === 0) {
    throw new Error("Order must have at least one item");
  }

  if (!orderData.customer || !orderData.customer.email) {
    throw new Error("Customer email is required");
  }

  try {
    const response = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ order: orderData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit order");
    }

    const result = await response.json();
    console.log("Order submitted successfully:", result);
    return result;
  } catch (error) {
    console.error("Order submission error:", error.message);
    throw error;
  }
}
```

---

# 🎛️ Context API Deep Dive

## What is Context API?

Context API is a way to pass data through the component tree without having to pass props down manually at every level.

## Problem Context Solves - Prop Drilling

```javascript
// ❌ WITHOUT Context - Prop Drilling Hell
function App() {
  const [theme, setTheme] = useState("light");
  return <Level1 theme={theme} />;
}

function Level1({ theme }) {
  return <Level2 theme={theme} />;
}

function Level2({ theme }) {
  return <Level3 theme={theme} />;
}

function Level3({ theme }) {
  return <Level4 theme={theme} />;
}

function Level4({ theme }) {
  return <p>Theme: {theme}</p>;
}
```

```javascript
// ✅ WITH Context - Clean!
function App() {
  return (
    <ThemeProvider>
      <Level1 />
    </ThemeProvider>
  );
}

function Level1() {
  return <Level2 />;
}

function Level2() {
  return <Level3 />;
}

function Level3() {
  return <Level4 />;
}

function Level4() {
  const theme = useContext(ThemeContext);
  return <p>Theme: {theme}</p>;
}
```

## Creating Context Step-by-Step

### Step 1: Create Context

```javascript
import { createContext } from "react";

// Create context with default value
const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
```

### Step 2: Create Provider

```javascript
import { useState } from "react";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
```

### Step 3: Wrap App with Provider

```javascript
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Header />
      <MainContent />
      <Footer />
    </AuthProvider>
  );
}

export default App;
```

### Step 4: Use Context in Components

```javascript
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function LoginButton() {
  const { user, isLoggedIn, login, logout } = useContext(AuthContext);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button
          onClick={() => login({ name: "John", email: "john@example.com" })}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default LoginButton;
```

---

# 🍔 FoodOrder Project Code Walkthrough

## Project Overview

```
foodOrder/
├── backend/
│   ├── app.js (Express server)
│   ├── data/
│   │   ├── available-meals.json
│   │   └── orders.json
│   └── package.json
│
└── src/
    ├── App.jsx (Main entry)
    ├── store/
    │   ├── CartContext.jsx
    │   └── UserProgressContext.jsx
    └── component/
        ├── Header.jsx
        ├── Meals.jsx
        ├── MealItem.jsx
        ├── Cart.jsx
        └── Checkout.jsx
```

---

## 1. App.jsx - Main Entry Point

```javascript
import Meals from "./component/Meals";
import Header from "./component/Header";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./component/Cart";
import Checkout from "./component/Checkout";

function App() {
  return (
    // UserProgressContextProvider - manages which modal is open
    <UserProgressContextProvider>
      {/* CartContextProvider - manages cart items */}
      <CartContextProvider>
        {/* Main components */}
        <Header title="React logo" />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
```

**What's happening:**

- 🎛️ **Context wrapping**: Two providers wrap the entire app
- 📦 **CartContextProvider**: Provides cart state to all components
- 🎯 **UserProgressContextProvider**: Manages modal visibility (cart/checkout)
- 📋 Components can now access both contexts using `useContext()`

---

## 2. CartContext.jsx - Cart State Management

```javascript
import { createContext, useReducer } from "react";

// Create context
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

// Reducer function - handles cart logic
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // Check if item already exists in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      // Item exists - increase quantity
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // New item - add with quantity 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // Remove item completely from cart
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // Reduce quantity by 1
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    // Empty the cart
    return { ...state, items: [] };
  }

  return state;
}

// Provider component
function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const contextValue = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export { CartContextProvider, CartContext };
```

**Breaking it down:**

1. **Context Creation**: `createContext()` creates a new context
2. **Reducer Function**: `cartReducer` handles three actions:
   - `ADD_ITEM`: Add new item or increase existing item's quantity
   - `REMOVE_ITEM`: Remove item or decrease quantity
   - `CLEAR_CART`: Empty all items
3. **Provider**: Wraps components and provides cart functions
4. **useReducer**: Manages cart state with predictable logic

**State Flow:**

```
User clicks "Add Item"
↓
dispatch({ type: 'ADD_ITEM', item })
↓
cartReducer checks if item exists
↓
If exists: increase quantity
If new: add with quantity 1
↓
Re-render components with new state
```

---

## 3. UserProgressContext.jsx - Modal Management

```javascript
import { createContext, useState } from "react";

const UserProgressContext = createContext({
  progress: "", // '', 'cart', or 'checkout'
  showCart: () => {},
  hideCart: () => {},
  showCheckout: () => {},
  hideCheckout: () => {},
});

function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function hideCheckout() {
    setUserProgress("");
  }

  const contextValue = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}

export { UserProgressContextProvider, UserProgressContext };
```

**What it does:**

- Tracks which modal should be visible
- `progress` can be: `''` (hidden), `'cart'`, or `'checkout'`
- Provides functions to show/hide modals

---

## 4. Header.jsx - Shows Cart Count

```javascript
import { useContext } from "react";
import cartImage from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header({ title }) {
  // Get cart context
  const cartCtx = useContext(CartContext);

  // Get modal context
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate total items in cart
  const totalCartItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function handleShowCart() {
    userProgressCtx.showCart(); // Open cart modal
  }

  return (
    <div id="main-header">
      <div id="title">
        <img src={cartImage} alt="logo" />
        <h2>{title}</h2>
      </div>
      <nav>
        {/* Button shows cart count */}
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </div>
  );
}
```

**Key points:**

- Uses `reduce()` to calculate total items
- Clicking button calls `showCart()` which opens the cart modal
- Cart count updates automatically when items added/removed

---

## 5. Meals.jsx - Display All Meals

```javascript
import { useContext } from "react";
import { MealContext } from "../store/meal-context";
import MealItem from "./MealItem";

export default function Meals() {
  // Get meals from context
  const oder = useContext(MealContext);
  const { meals, isLoading, error } = oder;

  // Show loading state
  if (isLoading) {
    return <p>Loading meals...</p>;
  }

  // Show error if fetch failed
  if (error) {
    return <p>{error}</p>;
  }

  // Display meals
  return (
    <div id="meals">
      {meals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </div>
  );
}
```

**Flow:**

1. Fetch meals from backend in MealContext
2. Return loading state while fetching
3. Return error if fetch fails
4. Display each meal using MealItem component

---

## 6. MealItem.jsx - Individual Meal Card

```javascript
import { useContext } from "react";
import CartContext from "../store/CartContext";
import Button from "./UI/Button";

const price = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
});

export default function MealItem({ meal }) {
  // Format price as currency
  const orderedPrice = price.format(meal.price);

  // Get cart context
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    // Add meal to cart
    cartCtx.addItem(meal);
  }

  return (
    <li className="meal-item">
      <article>
        {/* Serve image from backend */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{orderedPrice}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
```

**Key points:**

- Shows meal information (name, price, description, image)
- Button calls `cartCtx.addItem()` to add to cart
- Image served from backend with `http://localhost:3000/`

---

## 7. Cart.jsx - Show and Manage Cart Items

```javascript
import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
  // Get cart and modal state
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate total price
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.price * item.quantity,
    0,
  );

  function handleCloseCart() {
    userProgressCtx.hideCart(); // Close modal
  }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout(); // Open checkout
  }

  // Modal is visible only when progress === 'cart'
  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
```

**Breaking it down:**

1. **Modal visibility**: Only shows when `progress === 'cart'`
2. **Calculate total**: `reduce()` multiplies price × quantity
3. **Cart items**: Map over items and display with increase/decrease buttons
4. **Checkout button**: Only shows if cart has items

---

## 8. Checkout.jsx - Order Form

```javascript
import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import UserProgressContext from "../store/UserProgressContext";
import CartContext from "../store/CartContext";

export default function Checkout() {
  const userProgressCtx = useContext(UserProgressContext);
  const cartCtx = useContext(CartContext);

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Get form data
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd); // Convert FormData to object

    // Prepare order
    const order = {
      items: cartCtx.items,
      customer: customerData,
    };

    // Send to backend
    try {
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const result = await response.json();
      console.log("Order submitted:", result);

      // Clear cart and close modal
      cartCtx.clearCart();
      userProgressCtx.hideCheckout();

      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to place order");
    }
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleClose}
      className="checkout"
    >
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Full Name" type="text" name="name" required />
        <Input label="Email Address" type="email" name="email" required />
        <Input label="Street" type="text" name="street" required />

        <div className="control-row">
          <Input label="Postal Code" type="text" name="postal-code" required />
          <Input label="City" type="text" name="city" required />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
```

**Key points:**

1. **FormData**: Collects form data easily
2. **POST request**: Sends order to backend
3. **Error handling**: Try-catch for network errors
4. **Cleanup**: Clear cart and close modal after success

---

## 9. Backend - app.js - Express Server

```javascript
import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// CORS headers (allow requests from frontend)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// GET /meals - Return all available meals
app.get("/meals", async (req, res) => {
  try {
    const meals = await fs.readFile("./data/available-meals.json", "utf8");
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: "Failed to load meals" });
  }
});

// POST /orders - Save order to database
app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  // Validate order data
  if (
    orderData === null ||
    orderData.items === null ||
    orderData.items.length === 0
  ) {
    return res.status(400).json({ message: "Missing data." });
  }

  // Validate customer data
  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes("@") ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === "" ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === "" ||
    orderData.customer["postal-code"] === null ||
    orderData.customer["postal-code"].trim() === "" ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ""
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, postal code or city is missing.",
    });
  }

  // Create new order with unique ID
  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  try {
    // Read existing orders
    const orders = await fs.readFile("./data/orders.json", "utf8");
    const allOrders = JSON.parse(orders);

    // Add new order
    allOrders.push(newOrder);

    // Save to file
    await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));

    res.status(201).json({ message: "Order created!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save order" });
  }
});

// Handle unknown routes
app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Not found" });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

**Explanation:**

1. **GET /meals**: Reads from JSON file and returns meals
2. **POST /orders**: Validates, saves to JSON file
3. **CORS**: Allows frontend to make requests (cross-origin)
4. **Error handling**: Returns appropriate status codes

---

# 📊 Complete Data Flow Diagram

```
USER INTERACTION                COMPONENT              CONTEXT/STATE         BACKEND

Page Loads                   Meals Component
                             useEffect
                                 |
                                 +------- fetch('/meals') ------> GET /meals API
                                                                         |
                                                                    Read meals.json
                                                                         |
Display meals         <----- JSON response <----- State Update <-----+


User clicks "Add"         MealItem Component
                          onClick handler
                                 |
                         dispatch AddItem
                                 |
                          CartContext.reducer
                                 |
                          Update state
                                 |
Header auto-updates <----- Re-render with new count


User clicks Cart Button       Header Component
                              onClick handler
                                 |
                        showCart() in context
                                 |
                        UserProgress = 'cart'
                                 |
             Cart Modal opens <-  Re-render


User fills form          Checkout Component
                              Form Submit
                                 |
                         Create order object
                                 |
                         fetch POST request
                                 |
                             send JSON
                                 |
                                 +------ POST /orders -------> Backend API
                                                                   |
                                                              Validate data
                                                                   |
                                                              Save to orders.json
                                                                   |
                         Success response <----- 201 Created <-+


Clear cart + Close        CartContext.clearCart()
                         UserProgress = ''
                              |
                        Display success message
```

---

## Complete User Flow

```
1. APP LOADS
   ├─ Backend serves meals
   └─ Frontend fetches GET /meals

2. USER SEES MEALS
   ├─ All meals displayed
   └─ Each has "Add to Cart" button

3. USER CLICKS "ADD TO CART"
   ├─ CartContext.addItem() dispatches
   ├─ Reducer increases quantity or adds new
   └─ Header updates cart count

4. USER CLICKS "CART" BUTTON
   ├─ UserProgressContext.showCart()
   ├─ Cart modal becomes visible
   └─ User sees items with modify options

5. USER GOES TO CHECKOUT
   ├─ UserProgressContext.showCheckout()
   ├─ Checkout modal appears
   └─ User fills form

6. USER CLICKS "SUBMIT ORDER"
   ├─ Form data collected
   ├─ POST request sent to `/orders`
   ├─ Backend validates and saves
   ├─ Response returns
   ├─ CartContext.clearCart()
   └─ Order complete!
```

---

# ✅ Best Practices & Tips

## React Best Practices

### 1. Keep Components Small

```javascript
// ❌ BAD - Too many responsibilities
function MealsList() {
  const [meals, setMeals] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  // ... 200 lines of code
}

// ✅ GOOD - Separated concerns
function MealsList() {
  const meals = useMeals(); // Custom hook
  const cartCtx = useContext(CartContext);
  // Focused on one job
}
```

### 2. Use Custom Hooks for Reusable Logic

```javascript
// ✅ GOOD - Reusable hook
function useMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch logic
  }, []);

  return { meals, isLoading, error };
}
```

### 3. Memoize Expensive Calculations

```javascript
import { useMemo } from "react";

function Cart() {
  const cartCtx = useContext(CartContext);

  // Only recalculate when items change
  const total = useMemo(() => {
    return cartCtx.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }, [cartCtx.items]);

  return <p>Total: ${total}</p>;
}
```

### 4. Separate Business Logic from UI

```javascript
// ✅ GOOD - Separate files
// utils/calculations.js
export function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Component.jsx
import { calculateCartTotal } from "../utils/calculations";

function Cart() {
  const total = calculateCartTotal(cartCtx.items);
  return <p>Total: ${total}</p>;
}
```

---

## State Management Best Practices

### 1. Choose the Right Solution

| Use Case                | Solution               |
| ----------------------- | ---------------------- |
| Simple UI state         | `useState`             |
| Shared state across app | `Context API`          |
| Complex state logic     | `useReducer` + Context |
| Frequent updates        | Redux, Zustand         |
| Server state            | React Query, SWR       |

### 2. Structure Context Well

```javascript
// ✅ GOOD - Clear context structure
const StoreContext = createContext({
  cart: {
    items: [],
    total: 0,
  },
  actions: {
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
  },
});
```

### 3. Use useReducer for Complex State

```javascript
// ✅ GOOD - Predictable updates
function reducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    default:
      return state;
  }
}
```

---

## HTTP Best Practices

### 1. Always Handle Errors

```javascript
// ✅ GOOD - Comprehensive error handling
async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw for caller to handle
  }
}
```

### 2. Validate Request Data

```javascript
// ✅ GOOD - Validate before sending
async function submitOrder(order) {
  // Validate
  if (!order.items?.length) throw new Error("No items");
  if (!order.customer?.email) throw new Error("No email");

  // Send
  const response = await fetch("/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  return response.json();
}
```

### 3. Use Base URL for Easier Maintenance

```javascript
// ✅ GOOD - Centralized API config
const API_BASE_URL = "http://localhost:3000";

export const api = {
  getMeals: () => fetch(`${API_BASE_URL}/meals`).then((r) => r.json()),
  submitOrder: (order) =>
    fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order }),
    }).then((r) => r.json()),
};
```

### 4. Use Proper Status Codes

```javascript
// ✅ GOOD - Return meaningful status codes
app.post("/orders", async (req, res) => {
  if (!validateOrder(req.body)) {
    return res.status(400).json({ message: "Invalid order" }); // Bad Request
  }

  try {
    const order = await saveOrder(req.body);
    return res.status(201).json(order); // Created
  } catch (error) {
    return res.status(500).json({ message: "Server error" }); // Server Error
  }
});
```

---

## Performance Tips

### 1. Load Data Only Once

```javascript
// ✅ GOOD - Dependency array ensures one fetch
useEffect(() => {
  fetchMeals();
}, []); // Empty array = run once
```

### 2. Debounce Search Requests

```javascript
import { useEffect, useState } from "react";

function SearchMeals() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`/meals?search=${search}`)
        .then((r) => r.json())
        .then((data) => setResults(data));
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timer); // Cleanup
  }, [search]);

  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {results.map((meal) => (
          <li key={meal.id}>{meal.name}</li>
        ))}
      </ul>
    </>
  );
}
```

### 3. Lazy Load Components

```javascript
import { lazy, Suspense } from "react";

const Checkout = lazy(() => import("./Checkout"));

function App() {
  return (
    <Suspense fallback={<p>Loading checkout...</p>}>
      <Checkout />
    </Suspense>
  );
}
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Mutating State Directly

```javascript
// ❌ BAD
setState(state.items.push(newItem)); // Mutates original

// ✅ GOOD
setState([...state.items, newItem]); // Creates new array
```

### ❌ Mistake 2: Missing Dependency Array

```javascript
// ❌ BAD - Infinite loop!
useEffect(() => {
  fetchData();
}); // No dependency array = runs every render

// ✅ GOOD
useEffect(() => {
  fetchData();
}, []); // Empty array = run once
```

### ❌ Mistake 3: Not Handling Loading States

```javascript
// ❌ BAD
return <div>{items.map(...)}</div>;  // Crashes if items undefined

// ✅ GOOD
if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
return <div>{items.map(...)}</div>;
```

### ❌ Mistake 4: Not Validating Server Response

```javascript
// ❌ BAD
const data = await fetch(url).then((r) => r.json());
// What if response.ok is false?

// ✅ GOOD
const response = await fetch(url);
if (!response.ok) throw new Error(`HTTP ${response.status}`);
const data = await response.json();
```

---

## Quick Reference Cheat Sheet

### Hooks Comparison

| Hook          | Use Case          | Example                                                  |
| ------------- | ----------------- | -------------------------------------------------------- |
| `useState`    | Simple state      | `const [count, setCount] = useState(0)`                  |
| `useContext`  | Global state      | `const theme = useContext(ThemeContext)`                 |
| `useReducer`  | Complex state     | `const [state, dispatch] = useReducer(reducer, initial)` |
| `useEffect`   | Side effects      | `useEffect(() => { fetch() }, [])`                       |
| `useMemo`     | Memoize values    | `const total = useMemo(() => calc(), [deps])`            |
| `useCallback` | Memoize functions | `const func = useCallback(() => {}, [deps])`             |

### HTTP Methods

| Method | Purpose    | Example                                        |
| ------ | ---------- | ---------------------------------------------- |
| GET    | Fetch data | `fetch('/meals')`                              |
| POST   | Create     | `fetch('/orders', { method: 'POST', body })`   |
| PUT    | Replace    | `fetch('/meals/1', { method: 'PUT', body })`   |
| PATCH  | Update     | `fetch('/meals/1', { method: 'PATCH', body })` |
| DELETE | Remove     | `fetch('/meals/1', { method: 'DELETE' })`      |

---

## Summary

**You've learned:**
✅ React Hooks and State Management
✅ Context API for sharing state
✅ useReducer for complex logic
✅ HTTP requests and REST APIs
✅ async/await and error handling
✅ The complete foodOrder project
✅ Best practices and patterns

**Next Steps:**
🚀 Build more projects
🚀 Learn Redux for larger state management
🚀 Try React Query for server state
🚀 Explore TypeScript for type safety

---

**Happy Coding! 🎉**

_This guide is your reference. Keep it bookmarked and revisit whenever you're stuck!_
