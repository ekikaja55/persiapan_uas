import { Box, Button, Input, Paper, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import Joi from "joi"
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const defaultMessages = {
    'any.required': 'Field ini wajib diisi',
    'string.base': 'Harus teks',
    'string.min': 'Teks terlalu pendek',
    'number.base': 'Harus angka',
    'number.min': 'Nilai terlalu kecil',
};

const schema = Joi.object({
    name: Joi.string().min(3).required().messages(defaultMessages),
    age: Joi.number().min(1).messages(defaultMessages)
})

const UserForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema)
    })
    const [data, setdata] = useState(null)
    const [dataFetch, setdataFetch] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(null)


    const btnTrigger = (data) => {
        console.log("masuk btn");
        setdata(data)
        console.log(data);
    }

    const resetHandler = () => {
        console.log("reset");
        reset()
        setdata(null)
        console.log(data);

    }

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("http://localhost:3000/api/mhs")
                .then((response) => {
                    setdataFetch(response.data.data.map((item, index) => {
                        return {
                            id: index + 1,
                            nrp: item.nrp,
                            nama: item.nama,
                            jurusan: item.jurusan
                        }
                    }));
                    setloading(false)

                })
                .catch((err) => {
                    console.log(err.message);
                    seterror(err.message);
                    setloading(false)
                })

        }, 10000);

        return () => { clearInterval(interval) }
    }, [])



    if (loading) {
        return (
            <Typography variant="h4" color="info">
                loading sabar ya kontol....
            </Typography>
        )
    }
    if (error) {
        return (
            <>
                <Typography variant="h4" color="warning">
                    error anjing kontol
                </Typography>
                <Typography variant="h2" color="warning">
                    {error}
                </Typography>
            </>

        )
    }


    return (
        <>
            <Box p={4}>
                <Link to="/">
                <Button variant="outlined" color="secondary">back to lobby</Button>
                </Link>
                <Typography variant="h1">
                    User Form
                </Typography>

                <Typography variant="h2">
                    {data && <p style={{ color: "red" }}>welcome {data.name} dengan umur {data.age}</p>}
                </Typography>


                <form onSubmit={handleSubmit(btnTrigger)}>
                    <Stack direction={"column"} spacing={4}>

                        <Box>
                            <TextField
                                type="text"
                                fullWidth
                                label="masukan nama anda"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}

                            />
                        </Box>
                        <Box>
                            <TextField
                                fullWidth
                                type="number"
                                label="masukan umur anda"
                                {...register("age")}
                                error={!!errors.age}
                                helperText={errors.age?.message}

                            />
                        </Box>

                        <Stack direction={"row"} spacing={4}>
                            <Button type="submit" variant="contained" color="info">submit buat liat hasil </Button>
                            <Button type="button" variant="contained" color="error" onClick={resetHandler}>reset biar kosong  </Button>
                        </Stack>
                    </Stack>
                </form>


            </Box >

            <Box p={4}>
                <Paper>
                    <DataGrid
                        columns={[
                            { field: 'id', headerName: 'No', width: 70 },
                            { field: 'nrp', headerName: 'NRP', width: 130 },
                            { field: 'nama', headerName: 'Nama', width: 130 },
                            { field: 'jurusan', headerName: 'Jurusan', width: 130 },
                        ]}
                        rows={dataFetch}
                        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
                        pageSizeOptions={[5, 10]}
                    />
                </Paper>

            </Box >
        </>

    )
}

export default UserForm