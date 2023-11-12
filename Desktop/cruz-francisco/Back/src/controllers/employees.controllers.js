import {pool} from '../db.js'


export const getEmployees = async (req, res ) => {
    const [rows] = await pool.query("SELECT * FROM employee")
    res.json(rows)
}

export const getEmployee = async (req,res) => {

    const [rows] = await pool.query('SELECT * FROM employee WHERE id=?',[req.params.id])
    if(rows.length <= 0) return res.status(404).json({
        message:'El empleado no existe'
    })
    res.json(rows[0])
}

export const createEmployees = async (req, res ) => {

    const {nombre,salario} =  req.body
    const [rows] = await pool.query('INSERT INTO employee(nombre,salario) VALUES(?,?)',[nombre,salario])

    

    res.send({
        id: rows.insertId,
        nombre,
        salario,
    })
}


export const deleteEmployees = async (req, res ) => {
    const [result] = await pool.query('DELETE FROM employee WHERE id=?',[req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json({message:'Empleado no encontrado'})
    res.sendStatus(204)
}

export const updateEmployees = async (req, res ) => {
    const {id} = req.params
    const {nombre,salario} = req.body
    const [result] = await pool.query('UPDATE employee SET nombre=IFNULL(?, nombre),salario=IFNULL(?, salario) WHERE id=?',[nombre,salario,id])

    if (result.affectedRows===0) return res.status(404).json({message:'Empleado no encontrado'})

    const [rows] = await pool.query('SELECT * FROM employee WHERE id=?',[id])

    res.json(rows[0])
}
