import type { PageServerLoad } from './$types';

export const load = (async ({params}) => {
    const identificador = params.identificador;
    return {
        identificador
    };
}) satisfies PageServerLoad;