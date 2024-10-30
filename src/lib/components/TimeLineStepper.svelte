<script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	let activeYear: number | null = null;
	let container: HTMLElement;
	let items: HTMLElement[] = [];

	const years = [
		1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
		2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018
	];

	const itemsData = [
		{
			year: 1993,
			content: `
          <h2 class="milestone">1993</h2>
          <p>Example content for 1993...</p>
        `
		},
		{
			year: 1994,
			content: `
          <h2 class="milestone">1993</h2>
          <p>Example content for 1993...</p>
        `
		},
		{
			year: 1995,
			content: `
          <h2 class="milestone">1993</h2>
          <p>Example content for 1993...</p>
        `
		}
		// Add more items here
	];

	let observer: IntersectionObserver;

	onMount(() => {
		container = document.querySelector('.timeline__section') as HTMLElement;

		// console.log(items);
		// Initialize IntersectionObserver to watch each item
		if (items.length > 0) {
			observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 });
			items.forEach((item) => observer.observe(item));
		}

		return onDestroy(() => {
			observer?.disconnect();
		});
	});

	// Function to scroll to the year
	function handleYearClick(year: number) {
		activeYear = year;
		console.log('🚀 ~ handleYearClick ~ year:', year);
		const targetItem = items.find((item) => {
			console.log('🚀 ~ targetItem ~ item.dataset.year:', item.dataset.year);
			return item.dataset.year === String(year);
		});
		// console.log('🚀 ~ handleYearClick ~ targetItem:', targetItem);
		if (targetItem) {
			const scrollTop =
				targetItem.getBoundingClientRect().top + window.pageYOffset - container.offsetTop;
			window.scrollTo({
				top: scrollTop,
				behavior: 'smooth'
			});
		}
	}

	function handleIntersection(entries: IntersectionObserverEntry[]) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				const year = parseInt(entry.target.getAttribute('data-year') || '', 10);
				activeYear = year;
				break;
			}
		}
	}
</script>

<article class="timeline">
	<nav class="timeline__nav">
		<ul>
			{#each years as year}
				<li class:active={activeYear === year}>
					<span on:click={() => handleYearClick(year)}>{year}</span>
				</li>
			{/each}
		</ul>
	</nav>
	<section class="timeline__section">
		<div class="wrapper">
			{#each itemsData as item, i}
				<div class="timeline__item" data-year={item.year} bind:this={items[i]}>
					{@html item.content}
				</div>
			{/each}
		</div>
	</section>
</article>

<style>
	.timeline {
		display: flex;
		flex-direction: row;
	}

	.timeline__nav {
		flex-basis: 200px;
		border-right: 2px solid #ccc;
		padding-right: 2rem;
	}

	.timeline__nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.timeline__nav li {
		cursor: pointer;
		margin-bottom: 1rem;
	}

	.timeline__nav li.active {
		font-weight: bold;
		color: #007bff;
	}

	.timeline__section {
		flex-grow: 1;
		padding-left: 2rem;
	}

	.timeline__item {
		margin-bottom: 2rem;
	}

	.milestone {
		font-size: 1.5rem;
		font-weight: bold;
	}
</style>
