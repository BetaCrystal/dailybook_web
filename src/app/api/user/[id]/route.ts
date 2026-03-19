import { apiBack } from "@/lib/apiBack";
import { getStatusFromError } from "@/utils/apiUtils";

export async function PUT(req: Request, context: { params: any }) {
    const { id } = await context.params;
    try {
        const body = await req.json();
        const data = await apiBack(`user/${id}`, 'PUT', {...body, id: String(id)});
        return Response.json(data);
    } catch (error: any) {
        const status = getStatusFromError(error);
        return new Response(JSON.stringify({ error: error.message }), { status });
    }
}