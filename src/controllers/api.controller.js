const db = require("../config/dbMySQL.js");

exports.getCreditCards = async(req, res) => {
    let connection;
    // Fetch tiene una promesa
    // fetch().then().catch()
    try {
        const size = req.params.size;
        const response = await fetch("https://random-data-api.com/api/v2/credit_cards?size="+size);
        const responseJSON = await response.json();
        // opción map
        const values = responseJSON.map(credit_card => [
            credit_card.id, 
            credit_card.uid,
            credit_card.credit_card_number,
            credit_card.credit_card_expiry_date,
            credit_card.credit_card_type,
        ]);
        connection = await db.getConnection();
        await connection.query("insert into credit_cards values ?", [values]);

        // opción bucle
        // responseJSON.forEach(async credit_card => {
        //     await connection.query("insert into credit_cards values (?,?,?,?,?)", [
        //         credit_card.id, 
        //         credit_card.uid,
        //         credit_card.credit_card_number,
        //         credit_card.credit_card_expiry_date,
        //         credit_card.credit_card_type
        //     ])
        // });

        return res.status(200).json({
            message: "Consumo a la randomAPI correcta",
            credit_cards: responseJSON
        })
    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo consumir randomAPI",
            error: "Error 500: " + error
        });
    }
    
}