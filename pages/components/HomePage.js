import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicTable() {
  const [page, setPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [clickedEllipse, setClickedEllipse] = useState("");
  const [hiddenNumbers, setHiddenNumbers] = useState([]);

  useEffect(() => {
    if (clickedEllipse) {
      showHiddenPageNumbers();
    }
  }, [pageNumbers, clickedEllipse]);

  const getThePaginationValues = (e) => {
    setPageNumbers([]);
    const ul = document.querySelector(".MuiPagination-ul");
    const liElements = ul.querySelectorAll("li");
    liElements.forEach((li, index) => {
      let number = li.textContent;
      if (number === "…") {
        number = `ellipse${index + 1}`;
        if (li.children.length > 0) {
          const div = li.querySelector("div");
          div.setAttribute("data-value", number);
        }
        setPageNumbers((pageNumbers) => [...pageNumbers, number]);
      } else {
        if (number) {
          setPageNumbers((pageNumbers) => [...pageNumbers, number]);
        }
      }
    });
    const val = e.target.getAttribute("data-value");
    if (val !== null) {
      setClickedEllipse(val);
    } else {
      setClickedEllipse("");
      setHiddenNumbers([]);
    }
  };

  const showHiddenPageNumbers = () => {
    const index = pageNumbers.indexOf(clickedEllipse);
    if (index !== -1) {
      const leftValue = parseInt(pageNumbers[index - 1]);
      const rightValue = parseInt(pageNumbers[index + 1]);
      let betweenNumbers = [];
      for (let i = leftValue + 1; i < rightValue; i++) {
        betweenNumbers.push(i);
      }
      setHiddenNumbers(betweenNumbers);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <div>
        <Pagination
          count={20}
          variant="outlined"
          color="primary"
          onClick={getThePaginationValues}
          page={page}
          onChange={handleChange}
        />
        <div style={{ marginTop: "10px" }}>
          {hiddenNumbers.map((num, index) => (
            <span
              key={index}
              style={{
                border: "1px solid rgba(25, 118, 210, 0.5)",
                padding: "2px 5px",
                marginRight: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleChange("", num);
                setHiddenNumbers([]);
              }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
    </Stack>
  );
}
