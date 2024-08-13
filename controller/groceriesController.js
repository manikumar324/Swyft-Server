const GroceriesModel = require("../model/groceriesModel")

exports.AddItems = async (req, res) => {
    try {
      // Sample data
      const items = [
        // Tea Items
        {
          name: 'Chicken Nuggets',
          category: 'frozen',
          price: 30, // Price in INR
          discount: 4, // Discount in INR
          image: Buffer.from('https://th.bing.com/th/id/R.9209513c7cbca7556fcb4940cd670e62?rik=RVJ0Fwx98ZSRzw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fchicken-nuggets-png-chicken-nuggets-nutrition-500.png&ehk=GYWSbReErpCjNwqGJVVzq3bB8cIu9I3Ze9fp5OPphoA%3d&risl=&pid=ImgRaw&r=0') // Placeholder; replace with actual base64-encoded image or URL
        },
        {
          name: 'Dolce Bagel',
          category: 'frozen',
          price: 60, // Price in INR
          discount: 7, // Discount in INR
          image: Buffer.from('https://www.pngmart.com/files/17/Sweet-Bagel-Transparent-PNG.png')
        },
        {
          name: 'Yogurt',
          category: 'frozen',
          price: 40, // Price in INR
          discount: 5, // Discount in INR
          image: Buffer.from('https://toppng.com/uploads/thumbnail/frozen-yogurt-11569049063ky5eyczxf7.png')
        },
        {
          name: 'Frozen Mango',
          category: 'frozen',
          price: 30, // Price in INR
          discount: 4, // Discount in INR
          image: Buffer.from('https://healthyfood-egypt.com/wp-content/uploads/2020/04/Frozen-Mango.png')
        },
        {
          name: 'Hot Dog',
          category: 'frozen',
          price: 90, // Price in INR
          discount: 11, // Discount in INR
          image: Buffer.from('https://pngimg.com/uploads/hot_dog/hot_dog_PNG10199.png')
        },
  
        // juices
        {
          name: 'Baklava',
          category: 'frozen',
          price: 60, // Price in INR
          discount: 4, // Discount in INR
          image: Buffer.from('https://square-production.s3.amazonaws.com/files/4edbd78c3c9e058b22b6739c7afa1e273cb59157/original.png')
        },
        {
          name: 'Frozen Bananas',
          category: 'frozen',
          price: 70, // Price in INR
          discount: 8, // Discount in INR
          image: Buffer.from('https://gamepedia.cursecdn.com/cookservedelicious_gamepedia_en/c/ce/FrozenBananas.png?version=33e95592a7d96e38d54ef02d85c00b88')
        },
        {
          name: 'Pita Bread',
          category: 'frozen',
          price: 15, // Price in INR
          discount: 2, // Discount in INR
          image: Buffer.from('https://www.pngplay.com/wp-content/uploads/13/Pita-Bread-Transparent-Images.png')
        },
        {
          name: 'Scallop Tempura',
          category: 'frozen',
          price: 20, // Price in INR
          discount: 4, // Discount in INR
          image: Buffer.from('https://png.pngtree.com/png-vector/20230907/ourmid/pngtree-frozen-scallop-tempura-isolated-eat-png-image_9227597.png')
        },
        {
          name: 'Mousakka',
          category: 'frozen',
          price: 50, // Price in INR
          discount: 6, // Discount in INR
          image: Buffer.from('https://png.pngtree.com/png-clipart/20230425/original/pngtree-a-moussaka-eggplant-png-image_9101599.png')
        }
      ];
  
      
      await GroceriesModel.insertMany(items);
  
      res.status(200).json({ message: 'Sample data added successfully!' });
    } catch (error) {
      console.error('Error adding items:', error);
      res.status(500).json({ error: 'Failed to add sample data' });
    }
  };



  exports.getItems = async(req,res) =>{
    try {
        const items = await GroceriesModel.find().exec();
        res.status(200).json(items);
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Failed to fetch items' });
        }
  }