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
} from "@mui/material";
import { RootState, AppDispatch } from "../store/store";
import { fetchTagsAsync } from "../store/tagsSlice";
import { fetchTags, Tag } from "../services/api";
import PaginationControl from "./PaginationControl";
import PageSize from "./PageSize";

const TagTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { tags, loading, error } = useSelector(
    (state: RootState) => state.tags
  );
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<"name" | "popular">("popular");

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
    setPage(1);
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

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "Center",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <PageSize
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => {
            setPageSize(newPageSize);
            setPage(1);
          }}
        />

        <Button variant="contained" onClick={() => handleSortChange("name")}>
          Sort by Name {sortBy === "name" && sortOrder === "asc" && "↑"}
          {sortBy === "name" && sortOrder === "desc" && "↓"}
        </Button>

        <Button variant="contained" onClick={() => handleSortChange("popular")}>
          Sort by Count {sortBy === "popular" && sortOrder === "asc" && "↑"}
          {sortBy === "popular" && sortOrder === "desc" && "↓"}
        </Button>

        <PaginationControl
          pageCount={10}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </div>
      <div style={{ width: "800px", margin: "0 auto" }}>
        {loading ? (
          <CircularProgress style={{ margin: "20px auto", display: "block" }} />
        ) : (
          <TableContainer component={Paper}>
            <Table style={{ textAlign: "center" }}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Tag name {sortBy === "name" && sortOrder === "asc" && "↑"}
                    {sortBy === "name" && sortOrder === "desc" && "↓"}
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Count {sortBy === "popular" && sortOrder === "asc" && "↑"}
                    {sortBy === "popular" && sortOrder === "desc" && "↓"}
                  </TableCell>
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
        )}
      </div>
    </div>
  );
};

export default TagTable;
