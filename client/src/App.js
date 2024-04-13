import {BrowserRouter, Routes, Route} from "react-router-dom";
import Add from "./pages/Add";
import Books from "./pages/Books";
import Update from "./pages/Update";

function App() {
	// this was a comment
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Books />} />
					<Route path="/add" element={<Add />} />
					<Route path="/update/:id" element={<Update />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
