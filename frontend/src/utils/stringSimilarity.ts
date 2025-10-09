import type { DropdowItem } from "../components/dropdown/Dropdown";

export default class StringSimilarity {
    getFragments(text: string, n: number) {
        text = text.toLocaleLowerCase();
        const fragments = [];

        for (let i = 0; i < text.length - n; i++) {
            fragments.push(text.slice(i, i + n));
        }

        return fragments;
    }

    similarity(search: string, compare: string, n: number) {
        const uniqueSearch = this.removeDuplicates(this.getFragments(search, n));
        const uniqueCompare = this.removeDuplicates(this.getFragments(compare, n));

        const intersection = uniqueSearch.filter((x) => uniqueCompare.includes(x));
        const union = this.removeDuplicates([...uniqueCompare, ...uniqueSearch]);

        if (union.length === 0) return 0;

        //formula padrao
        //const similarity = ((intersection.length / union.length) * 100);

        //dobro do peso para tokens em comum
        const similarity = ((intersection.length * 2) / union.length) * 100;

        return similarity;
    }

    removeDuplicates(arr: string[]) {
        const unique: string[] = [];

        for (const item of arr) {
            if (!unique.includes(item)) {
                unique.push(item);
            }
        }

        return unique;
    }

    compare(list: DropdowItem[], search: string) {
        const res = list.map((e) => {
            return {
                item: e,
                score: this.similarity(search, e.name, 2),
            };
        });
        console.log(res.sort((a, b) => (a.score < b.score ? 1 : -1)));

        const max = res.sort((a, b) => (a.score < b.score ? 1 : -1))[0];

        return list.find((e) => e.id === max.item.id);
    }
}
