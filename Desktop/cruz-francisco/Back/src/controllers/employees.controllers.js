import {pool} from '../db.js'


export const getEmployees = async (req, res ) => {
    try{
        
    const [rows] = await pool.query("SELECT * FROM employee")
    res.json(rows)
    } catch(error){
        return res.status(500).json({
            message:'something is wrong'
        })
    }
}

export const getEmployee = async (req,res) => {

    try{
    const [rows] = await pool.query('SELECT * FROM employee WHERE id=?',[req.params.id])
    if(rows.length <= 0) return res.status(404).json({
        message:'El empleado no existe'
    })
    res.json(rows[0])

} catch(error){
    return res.status(500).json({
        message:'something is wrong'
    })
}
}

export const createEmployees = async (req, res ) => {
    
    try{

    const {nombre,salario} =  req.body
    const [rows] = await pool.query('INSERT INTO employee(nombre,salario) VALUES(?,?)',[nombre,salario])

    

    res.send({
        id: rows.insertId,
        nombre,
        salario,
    })
}catch(error){
    return res.status(500).json({
        message:'something is wrong'
    })
}
}


export const deleteEmployees = async (req, res ) => {
    try{
    const [result] = await pool.query('DELETE FROM employee WHERE id=?',[req.params.id])
    if (result.affectedRows <= 0) return res.status(404).json({message:'Empleado no encontrado'})
    res.sendStatus(204)
    }catch(error){
        return res.status(500).json({
            message:'something is wrong'
        })
    }
}

export const updateEmployees = async (req, res ) => {
    try{
    const {id} = req.params
    const {nombre,salario} = req.body
    const [result] = await pool.query('UPDATE employee SET nombre=IFNULL(?, nombre),salario=IFNULL(?, salario) WHERE id=?',[nombre,salario,id])

    if (result.affectedRows===0) return res.status(404).json({message:'Empleado no encontrado'})

    const [rows] = await pool.query('SELECT * FROM employee WHERE id=?',[id])

    res.json(rows[0])
    }catch(error){
        return res.status(500).json({
            message:'something is wrong'
        })
    }
}
