import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { RootState, AppDispatch } from "../store/store";
import { fetchTagsAsync } from "../store/tagsSlice";
import { fetchTags, Tag } from "../services/api";

const TagTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tags, loading, error } = useSelector(
    (state: RootState) => state.tags
  );
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "popular">("name");

  useEffect(() => {
    fetchData();
  }, [page, pageSize, sortOrder, sortBy]);

  const fetchData = async () => {
    try {
      const fetchedTags = await fetchTags(page, pageSize, sortOrder, sortBy);
      dispatch(fetchTagsAsync({ page, pageSize, sortOrder, sortBy }));
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const handleSortChange = (newSortBy: "name" | "popular") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <FormControl>
        <InputLabel id="page-size-label">Items per page</InputLabel>
        <Select
          labelId="page-size-label"
          id="page-size"
          value={pageSize}
          onChange={(event) => {
            setPageSize(event.target.value as number);
            setPage(1);
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={() => handleSortChange("name")}>
        Sort by Name {sortBy === "name" && sortOrder === "asc" && "↑"}
        {sortBy === "name" && sortOrder === "desc" && "↓"}
      </Button>

      <Button variant="contained" onClick={() => handleSortChange("popular")}>
        Sort by Count {sortBy === "popular" && sortOrder === "asc" && "↑"}
        {sortBy === "popular" && sortOrder === "desc" && "↓"}
      </Button>

      <div>
        {[1, 2, 3, 4, 5].map((pageNumber) => (
          <Button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </Button>
        ))}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tag</TableCell>
              <TableCell align="right">Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags.map((tag: Tag) => (
              <TableRow key={tag.name}>
                <TableCell component="th" scope="row">
                  {tag.name}
                </TableCell>
                <TableCell align="right">{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TagTable;
