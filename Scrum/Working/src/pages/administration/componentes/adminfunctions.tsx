
export function slitdate( date : string): string{

    const fecha = new Date(date)

    return (fecha.toLocaleDateString('en-GB').replaceAll( '/', '-'))
}
