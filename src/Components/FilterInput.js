import React from 'react'
import TextField from "@material-ui/core/TextField";

const FilterInput = ({setSearchText  }) => {

    const filteringRecords = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <div className="filter-input">
             <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="pokemonname"
            label="filter by pokemon name"
            name="pokemonname"
            autoFocus
            onChange={(e)=> filteringRecords(e)}
          />
        </div>
    )
}

export default FilterInput
