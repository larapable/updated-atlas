import { NextResponse } from "next/server";
import STStrat from '/models/stStrategy.js';

  export async function POST(req) {
    try {
      const body = await req.json();
      const { response, department_id } = body;


      try {
        // Assuming your model has a method to insert a new strategy
        const result = await STStrat.postSTStrat(response, department_id);

       // Check if the W-T strategy was successfully posted
       if (result) {
        // Return the inserted values along with the response
        return NextResponse.json(result, { status: 201 });
    } else {
        // Return an error message if posting failed
        return NextResponse.json({ message: "An error occurred while posting S-T." }, { status: 500 });
    }
          } catch (error) {
              console.error("Error posting S-T:", error);
              return NextResponse.json({ message: "An error occurred while posting S-T." }, { status: 500 });
          }
          } catch (error) {
          console.error("Error handling request:", error);
          return NextResponse.json({ message: "An error occurred while handling the request." }, { status: 500 });
          }
  }


  export async function DELETE(req) {
    try {
        const { id, department_id } = await req.json();

        try {
            // Delete the W-T strategy
            const result = await STStrat.deleteSTStrat(id, department_id);

            // Check if the W-T strategy was successfully deleted
            if (result) {
                // Return a success message
                return NextResponse.json({ message: "S-T strategy deleted successfully." }, { status: 200 });
            } else {
                // Return an error message if deletion failed
                return NextResponse.json({ message: "An error occurred while deleting S-T." }, { status: 500 });
            }
        } catch (error) {
            console.error("Error deleting W-T:", error);
            return NextResponse.json({ message: "An error occurred while deleting S-T." }, { status: 500 });
        }
    } catch (error) {
        console.error("Error handling request:", error);
        return NextResponse.json({ message: "An error occurred while handling the request." }, { status: 500 });
    }
}