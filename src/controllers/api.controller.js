const db = require("../config/dbMySQL.js");

exports.getCreditCards = async(req, res) => {
    let connection;
    // Fetch tiene una promesa
    // fetch().then().catch()
    try {
        const size = req.params.size;
        const response = await fetch("https://random-data-api.com/api/v2/credit_cards?size="+size);
        const responseJSON = await response.json();
        // connection = await db.getConnection();
        // Si nos llega sólamente una tarjeta de crédito, llega como objeto , sinó array
        // if (Array.isArray(responseJSON)) {
        //     // opción map
        //     const values = responseJSON.map(credit_card => [
        //         credit_card.id, 
        //         credit_card.uid,
        //         credit_card.credit_card_number,
        //         credit_card.credit_card_expiry_date,
        //         credit_card.credit_card_type,
        //     ]);
        //     connection = await db.getConnection();
        //     await connection.query("insert into credit_cards values ?", [values]);
        // } else {
        //     await connection.query("insert into credit_cards values (?,?,?,?,?)", [
        //         responseJSON.id, 
        //         responseJSON.uid,
        //         responseJSON.credit_card_number,
        //         responseJSON.credit_card_expiry_date,
        //         responseJSON.credit_card_type
        //     ]);
        // }

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