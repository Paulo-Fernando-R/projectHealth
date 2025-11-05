import type { DropdowItem } from "../components/dropdown/Dropdown";

export default class StringSimilarity {
    private getFragments(text: string, n: number) {
        text = text.toLocaleLowerCase();
        const fragments = [];

        for (let i = 0; i < text.length - n; i++) {
            fragments.push(text.slice(i, i + n));
        }

        return fragments;
    }

    private similarity(search: string, compare: string, n: number) {
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

    private removeDuplicates(arr: string[]) {
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

        const max = this.getMaxScore(res);

        return list.find((e) => e.id === max.item.id);
    }

    compareList(list: DropdowItem[], search: string) {
        const res = list.map((e) => {
            return {
                item: e,
                score: this.similarity(search, e.name, 2),
            };
        });

        const filtered = res.filter((e) => e.score > 10).sort((a, b) => b.score - a.score);

        return filtered.map((e) => e.item);
    }

    private getMaxScore(
        list: {
            item: DropdowItem;
            score: number;
        }[]
    ) {
        let max = list[0];

        for (let i = 0; i < list.length; i++) {
            if (list[i].score > max.score) {
                max = list[i];
            }
        }

        return max;
    }
}
