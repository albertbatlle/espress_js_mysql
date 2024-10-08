exports.getCreditCards = async(req, res) => {
    // Fetch tiene una promesa
    // fetch().then().catch()
    try {
        const size = req.params.size;
        const response = await fetch("https://random-data-api.com/api/v2/credit_cards?size="+size);
        const responseJSON = await response.json();
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