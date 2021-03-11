interface IChild {
    kind: string;
    data: object;
}
interface IRedditData {
    modhash: string;
    dist: number;
    children: IChild[];
    after: string;
}
export const parseRedditResponse = ({data} : {data:IRedditData}) => {
    const {children = []} = data;
    return children.map((child: IChild) => child.data);
}