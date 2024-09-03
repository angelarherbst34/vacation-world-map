import { VacationLocation } from '@/types'
import { tss } from 'tss-react/mui'
import { useCallback, useMemo, useState } from 'react'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { Autocomplete, TextField } from '@mui/material'
import { RawResult } from 'leaflet-geosearch/src/providers/openStreetMapProvider.js'
import { SearchResult } from 'leaflet-geosearch/src/providers/provider.js'
import { debounce } from 'lodash'

interface AddressSearchProps {
  setVacationLocation: (vacationLocation: VacationLocation | null) => void
}
function AddressSearch({ setVacationLocation }: AddressSearchProps) {
  const { classes } = useStyles()

  const [options, setOptions] = useState<SearchResult<RawResult>[]>([])
  const [value, setValue] = useState<SearchResult<RawResult> | null>(null)

  const provider = useMemo(() => new OpenStreetMapProvider(), [])

  // useCallback cannot infer types from debounce; this is a known issue
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getAddresses = useCallback(
    debounce((input: string) => {
      void provider.search({ query: input }).then((results) => {
        setOptions(results)
      })
    }, 500),
    [provider],
  )

  return (
    <Autocomplete
      className={classes.root}
      autoComplete
      options={options}
      filterOptions={(x) => x}
      filterSelectedOptions
      getOptionLabel={(option) => option.label}
      noOptionsText="No locations"
      value={value}
      onInputChange={(_event, newInputValue) => {
        if (newInputValue === '') {
          setOptions(value ? [value] : [])
        } else {
          getAddresses(newInputValue)
        }
      }}
      onChange={(_event, newValue) => {
        setValue(newValue)
        const vacationLocation = newValue
          ? ({
              address: newValue.label,
              coord: [newValue.y, newValue.x],
            } as VacationLocation)
          : null
        setVacationLocation(vacationLocation)
      }}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Address of vacation" fullWidth />
      )}
      isOptionEqualToValue={(
        option: SearchResult<RawResult>,
        value: SearchResult<RawResult>,
      ): boolean => {
        return option.x === value.x && option.y === value.y
      }}
    />
  )
}

const useStyles = tss.withName({ AddressSearch }).create({
  root: {
    width: '100%',
  },
})

export default AddressSearch
